#!/usr/bin/env python3
import os
import re
import yaml

if __name__ == "__main__":
  for (root, dirs, files) in os.walk(os.path.join('.', 'src/content/read/'), topdown=True):
        # Traverse md files
        for file in files:
          if not file.endswith(".md"):
             print(f"Skipping non-Markdown file: {file}")
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
            line = line.rstrip()
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
          r = re.search(r'^(\d{4})-(\d{2})-(\d{2})-(.*)[.]md$', file)
          if not r:
             print(f"Oops, file does not match: {file}")
             exit(1)
          (year, month, day, file_title) = r.groups()

          if "slug" in frontMatter:
             print(f"Skipping already processed file: {file}")
             continue

          print(f"Processing: {file}...")

          # Complete with missing optional attributes
          if not "tags" in frontMatter:
             frontMatter["tags"] = []
          if not "unofficialTags" in frontMatter:
             frontMatter["unofficialTags"] = []
          if not "image" in frontMatter:
             frontMatter["image"] = "FIXME"
          if not "isbn" in frontMatter["metadata"]:
             frontMatter["metadata"]["isbn"] = "FIXME"
          if not "stars" in frontMatter:
             frontMatter["stars"] = "FIXME"

          # Format the Astro file
          bodyAstro = (
            f"---\n"
            f"slug: {year}/{month}/{day}/{file_title}\n"
            f"title: \"{frontMatter['title']}\"\n"
            f"shortTitle: \"{frontMatter['shortTitle']}\"\n"
            f"author: Julien Sobczak\n"
            f"date: {frontMatter['date']}\n"
            f"subject: \"{frontMatter['subject']}\"\n"
            f"headline: \"{frontMatter['headline']}\"\n"
            f"note: {frontMatter['note']}\n"
            f"stars: {frontMatter['stars']}\n"
            f"tags: {frontMatter['tags']}\n"
            f"unofficialTags: {frontMatter['unofficialTags']}\n"
            f"cover: \"{frontMatter['image']}\"\n"
            f"bookAuthors: \"{frontMatter['metadata']['authors']}\"\n"
            f"bookIsbn: '{frontMatter['metadata']['isbn']}'\n"
            f"---\n"
            f"\n"
            f"{bodyRaw}\n"
          )

          with open(file_path, 'w') as f:
            f.write(bodyAstro)
