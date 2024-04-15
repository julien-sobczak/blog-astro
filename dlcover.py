#!/usr/bin/env python3
import os
import yaml
import re
import urllib.request
from pathlib import Path

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

          # Parse
          frontMatter = yaml.safe_load(frontMatterRaw)
          # Extract the date
          r = re.search(r'^(\d{4})-(\d{2})-(\d{2})-(.*)[.]md$', file)
          if not r:
             print(f"Oops, file does not match: {file}")
             exit(1)
          (year, month, day, file_title) = r.groups()


          if not "cover" in frontMatter:
            # No cover image to download
            continue

          image_url = frontMatter["cover"]
          if "posts_resources/" in image_url:
            # Already downloaded
            continue

          image_name = Path(file).stem
          image_suffix = Path(image_url).suffix
          image_path = f"./public/posts_resources/covers/{file_title + image_suffix}"
          print(f"{image_url} => {image_path}")
          urllib.request.urlretrieve(image_url, filename=image_path)

          bodyNew = "".join(lines).replace(image_url, image_path.lstrip("./public/"))
          with open(file_path, 'w') as f:
            f.write(bodyNew)
