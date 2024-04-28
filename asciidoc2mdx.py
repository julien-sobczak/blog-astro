#!/usr/bin/env python3
import os
import re
import yaml

"""
Not supported:
--------------

* ✅ FrontMatter toc: Ex:
    toc: true
* ✅ FrontMatter excerpt. Ex:
    excerpt: >
      Operating systems run different programs at the same time. As these programs are often written by different developers, the operating system guarantees the correct use of resources. One program cannot use all the memory or read data written by another program. Whenever your program wants to execute a privileged action like printing a text on screen, it requests that the kernel perform the action on its behalf. How does it work? This post will show the underlying code executed when you call a Linux system call.
    excerpt_only: true
* ✅ Subdirectories (APT and Unicode blog posts)
* Code blocks highlight/line markers generated are not valid with Code-Expressive
  Ex: [#mockito-from-scratch-when]
* ✅ Do not remove ":imagesdir:" directives
* ✅ Do not replace "image:" (only "image::")
* ✅ Anchors: Ex: xref:sect-part1
* ✅ Tables
* ✅ Special tags. Ex: [.compact]
"""

if __name__ == "__main__":
  for (root, dirs, files) in os.walk(os.path.join('.', 'archives'), topdown=True):
        # Traverse md files
        for file in files:
          if not file.endswith(".adoc"):
             print(f"Skipping non-Asciidoc file: {file}")
             continue

          if "2014-10-06-junit4-from-scratch" in file:
            # Skipping demo file
            continue

          # Read the file
          file_path = os.path.join(root, file)
          with open(file_path, 'r') as f:
            lines = f.readlines()

          # Extract the Front Matter and the Body
          frontMatterStarted = False
          frontMatterRaw = ""
          bodyRaw = ""
          for line in lines:
            line = line.removesuffix("\n")
            if line == "---":
              frontMatterStarted = not frontMatterStarted
            else:
              if frontMatterStarted:
                frontMatterRaw += f"{line}\n"
              else:
                bodyRaw += f"{line}\n"
          # Parse
          frontMatter = yaml.safe_load(frontMatterRaw)
          # Extract the date
          r = re.search(r'^(\d{4})-(\d{2})-(\d{2})-(.*)[.]adoc$', file)
          if not r:
             print(f"Skipping non-matching file: {file}")
             continue
          (year, month, day, file_title) = r.groups()

          print(f"Processing: {file}...")

          mdxFrontMatter = (
f"""---
slug: "{year}/{month}/{day}/{file_title}"
title: "{frontMatter['title']}"
author: "Julien Sobczak"
date: {year}-{month}-{day}
subject: "{frontMatter['subject']}"
tags: {frontMatter['tags'] if 'tags' in frontMatter else '[]'}
unofficialTags: {frontMatter['unofficialTags'] if 'unofficialTags' in frontMatter else '[]'}
recommendations: {frontMatter['recommendations'] if 'recommendations' in frontMatter else '[]'}
---
"""
          )

          # The new body
          mdxBody = ""

          # Keep track of the current position for multi-line structures
          inside_source = False
          inside_admonition = False
          admonition_type = None
          admonition_title = None
          admonition_class = None
          admonition_started = None
          inside_sidebar = False
          inside_title = None

          bodyLines = bodyRaw.split("\n")
          i = 0
          while i < len(bodyLines) - 1:
            line = bodyLines[i]
            i += 1

            # Admonition
            r = re.search(r'^\[(\w+)(?:[.](\w+))?\]', line)
            if r:
              (admonition_type, admonition_class) = r.groups()
              inside_admonition = True
              continue
            if inside_admonition and not admonition_title and line.startswith("."):
              admonition_title = line.removeprefix(".")
              continue
            if inside_admonition and (line == "====" or line == "****"):
              if not admonition_started:
                mdxBody += f'<Admonition type="{admonition_type.lower()}" className="{admonition_class}" title="{admonition_title}">\n'
                admonition_started = True
              else:
                mdxBody += f'</Admonition>\n'
                inside_admonition = False
                admonition_type = None
                admonition_title = None
                admonition_class = None
                admonition_started = None
              continue

            # Code Block
            # Ex: [source,java] => ```java
            # Ex: [source,html,linenums,highlight='8..13'] => ```html showLineNumbers {8-13}
            r = re.search(r'^\[source,(\w+)(?:[,](.+))?\]', line)
            if r:
              (language, options) = r.groups()
              inside_source = True

              title_option = ""
              highlight_option = ""
              if options:
                # Ex: highlight='8..13'
                r = re.search(r"highlight='(.*?)'", options)
                if r:
                  highlight_option = " " + r.group(0)

              # Check for a title
              line = bodyLines[i]
              if line.startswith("."):
                title_option = f' title="{line.lstrip(".")}"'
                i += 1 # Skip title

              i += 1 # Skip ----

              code_source = ""
              line_markers = {}
              while True:
                line = bodyLines[i]
                i += 1
                if line == "----":
                  inside_source = False
                  line_markers_option = " showLineMarkers:" + str(line_markers) if line_markers else ''
                  line_numbers_option = " showLineNumbers" if options and "linenums" in options else ''
                  mdxBody += f'```{language}{title_option}{line_numbers_option}{highlight_option}{line_markers_option}\n'
                  mdxBody += code_source
                  mdxBody += f'```\n'
                  break
                else:
                  # Check for callout
                  r = re.search(r"<(\d+)>$", line)
                  if r:
                    number = r.group(1)
                    if number not in line_markers:
                      line_markers[number] = []
                    line_markers[number].append(i)
                  code_source += f"{line}\n"
              continue

            # Basic Code Block
            if line == "----":
              mdxBody += f"```\n"
              i += 1
              while True:
                line = bodyLines[i]
                i += 1
                if line == "----":
                  mdxBody += f"```\n"
                  break
                else:
                  mdxBody += f"{line}\n"
              continue

            # Quotes
            r = re.search(r'^\[quote,["]?(.*?)["]?\]', line)
            if r:
              author = r.group(1)
              i += 1 # Skip ____
              while True:
                line = bodyLines[i]
                i += 1
                if line == "____": # end of quote
                  mdxBody += f">\n"
                  mdxBody += f"> -- <cite>{author}</cite>\n" # FIXME search for `,\w`
                  break
                else:
                  mdxBody += f"> {line}\n"
              continue

            # Ignore Asciidoc-specific attributes
            if line.startswith(":page-liquid:") or \
               line.startswith(":tabsize:"):
              continue

            # Headings
            if line.startswith('======= '):
              mdxBody += f"####### {line.removeprefix('======= ')}\n"
              continue
            if line.startswith('====== '):
              mdxBody += f"###### {line.removeprefix('====== ')}\n"
              continue
            if line.startswith('===== '):
              mdxBody += f"##### {line.removeprefix('===== ')}\n"
              continue
            if line.startswith('==== '):
              mdxBody += f"#### {line.removeprefix('==== ')}\n"
              continue
            if line.startswith('=== '):
              mdxBody += f"### {line.removeprefix('=== ')}\n"
              continue
            if line.startswith('== '):
              mdxBody += f"## {line.removeprefix('== ')}\n"
              continue
            if line.startswith('= '):
              mdxBody += f"# {line.removeprefix('= ')}\n"
              continue

            # Lists
            if line.startswith("** "):
              mdxBody += f"  * {line.removeprefix('** ')}\n"
              continue
            if line.startswith("*** "):
              mdxBody += f"    * {line.removeprefix('*** ')}\n"
              continue

            # Lead
            if line.startswith("[.lead]"):
              line = bodyLines[i]
              i += 1
              mdxBody += f"<Lead>\n{line}\n</Lead>\n"
              continue

            # Comment
            if line.startswith("// "):
              mdxBody += "{/* " + line.removeprefix('// ') + " */}\n"
              continue

            # Images
            if line.startswith("image::"):
              r = re.search(r'^image::(.*?)\[(.*?)\]', line)
              if r:
                (link_url, link_options) = r.groups()

                link_width = None
                link_title = None
                link_align = None
                link_link = None

                # Ex: image::card-export-img.png[]
                # Ex: image::abstractions-step-3.png[width=300, align="center"]
                # Ex: image::unicode-standard-figure-2-3.png[title="Unicode Character Code to Rendered Glyphs (From Unicode Standard, Figure 2.3)", width=550]
                # Ex: image::frontend-x2.png[link={{ '/posts_resources/2020-12-08-the-pyramid-of-expertise/frontend-x3.png' | relative_url }}]
                # Ex: image::https://images.gr-assets.com/books/1445050174l/26312997.jpg[Peak,200]
                r = re.search(r'ˆ(.*),(\d+)$', link_options)
                if r:
                  (link_title, link_width) = r.groups()
                else:
                  r = re.search(r'ˆwidth=(\d+)', link_options)
                  if r:
                    link_width = r.groups(1)
                  r = re.search(r'align="(.*?)"', link_options)
                  if r:
                    link_align = r.groups(1)
                  r = re.search(r'ˆtitle="(.*?)"', link_options)
                  if r:
                    link_width = r.groups(1)
                  r = re.search(r'link=[{][{]\s*(\S*)', link_options)
                  if r:
                    link_link = r.groups(1)
                # Markdown doesn’t support defining the width of an image
                if link_link:
                  mdxBody += f'<a href="{link_link}">'
                mdxBody += f'<img src="{link_url}"'
                if link_title:
                  mdxBody += f' title="{link_title}"'
                if link_width:
                  mdxBody += f' width="{link_width}"'
                if link_align and link_align == "center":
                  mdxBody += f' class="center"'
                mdxBody += f' />'
                if link_link:
                  mdxBody += f'</a>'
                mdxBody += f'\n'
                continue

            # Callout
            r = re.search(r'^[<](\d+)[>]\s+(\S.*)', line)
            if r:
              (number, description) = r.groups()
              mdxBody += "* <Marker number={" + number + "} /> " + description + "\n"
              continue

            mdxBody += f"{line}\n"

          # Post-processing
          mdxBody = re.sub(r'link:(.*?)\[(.*?)\]', r'[\2](\1)', mdxBody) # Links
          mdxBody = re.sub(r'[*](\w.*?\w)[*]', r'**\1**', mdxBody)   # Bold


          # Write the MDX file
          mdx_path = os.path.join(".", "src/content/", "write" if "write" in file_path else "inspect", file.removesuffix(".adoc")+".mdx")
          with open(mdx_path, 'w') as f:
            f.write(mdxFrontMatter)
            f.write("import Admonition from '../../components/Admonition.astro'\n")
            f.write("import Marker from '../../components/Marker.astro'\n")
            f.write("import Lead from '../../components/Lead.astro'\n")
            f.write(mdxBody)
