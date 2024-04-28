#!/usr/bin/env python3
import os
import re
from os.path import normpath, basename


def read_content(file_path):
  with open(file_path, 'r') as f:
    lines = f.readlines()
  text = "".join(lines)
  return text

if __name__ == "__main__":
  for (root, dirs, files) in os.walk(os.path.join('.', 'src/content'), topdown=True):
        # Traverse md files
        for file in files:
          if not file.endswith(".mdx"):
             # print(f"Skipping non-MDX file: {file}")
             continue

          # Read the files
          mdx_file = os.path.join(root, file)
          adoc_file = os.path.join(".", "archives", basename(normpath(root)), file.removesuffix(".mdx") + ".adoc")

          mdx_text = read_content(mdx_file)
          adoc_text = read_content(adoc_file)

          # Search for <img> tags
          mdx_links = re.findall(r"(?:<a.*?>)?<img.*?/>(?:</a>)?", mdx_text)
          if not mdx_links:
             # Skip posts without images
             continue

          for mdx_link in mdx_links:
            r1 = re.search(r'src="(.*?)"', mdx_link)
            link_url = r1.group(1)

            link_baseurl = basename(link_url)
            r2 = re.search(r"image::?(.*" + re.escape(link_baseurl) + r")\[(.*?)\]", adoc_text)
            if not r2:
               print(f"Missing matching link {link_baseurl} in {adoc_file}")
               continue
            adoc_url = r2.group(1)
            adoc_attributes = r2.group(2)

            if adoc_attributes == "":
               # No attributes = nothing to recopy
               continue


            link_width = None
            link_height = None
            link_title = None
            link_align = None
            link_link = None

            # Ex: image::card-export-img.png[]
            # Ex: image::abstractions-step-3.png[width=300, align="center"]
            # Ex: image::unicode-standard-figure-2-3.png[title="Unicode Character Code to Rendered Glyphs (From Unicode Standard, Figure 2.3)", width=550]
            # Ex: image::frontend-x2.png[link={{ '/posts_resources/2020-12-08-the-pyramid-of-expertise/frontend-x3.png' | relative_url }}]
            # Ex: image::https://images.gr-assets.com/books/1445050174l/26312997.jpg[Peak,200]
            r = re.search(r'ˆ(.*?),(\d+)$', adoc_attributes)
            if r:
               (link_title, link_width) = r.groups()
            else:
               r = re.search(r'width="?(\d+)"?', adoc_attributes)
               if r:
                  link_width = r.group(1)
               r = re.search(r'height="?(\d+)"?', adoc_attributes)
               if r:
                  link_height = r.group(1)
               r = re.search(r'align="(.*?)"', adoc_attributes)
               if r:
                  link_align = r.group(1)
               r = re.search(r'title="(.*?)"', adoc_attributes)
               if r:
                  link_title = r.group(1)
               r = re.search(r'link=(\S+)', adoc_attributes)
               if r:
                  link_link = r.group(1).strip('"')
            # Markdown doesn’t support defining the width of an image
            mdx_link_new = ""
            if link_link:
               mdx_link_new += f'<a href="{link_link}">'
            mdx_link_new += f'<img src="{link_url}"'
            if link_title:
               mdx_link_new += f' title="{link_title}"'
            if link_width:
               mdx_link_new += f' width="{link_width}"'
            if link_height:
               mdx_link_new += f' height="{link_height}"'
            if link_align and link_align == "center":
               mdx_link_new += f' class="center"'
            mdx_link_new += f' />'
            if link_link:
               mdx_link_new += f'</a>'

            # Output result
            #print(f"{mdx_link}\n{mdx_link_new}\n")

            # Write back the MDX file
            mdx_text = mdx_text.replace(mdx_link, mdx_link_new)
            with open(mdx_file, 'w') as f:
               f.write(mdx_text)


