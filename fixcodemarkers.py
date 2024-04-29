#!/usr/bin/env python3
import os
import re
from os.path import basename


if __name__ == "__main__":
  for (root, dirs, files) in os.walk(os.path.join('.', 'src/content'), topdown=True):
    # Traverse md files
    for file in files:
      if not file.endswith(".mdx"):
        # print(f"Skipping non-MDX file: {file}")
        continue

      # Read the files
      mdx_file = os.path.join(root, file)
      mdx_lines = []
      with open(mdx_file, 'r') as f:
        mdx_lines = f.readlines()

      i = 0
      last_start_codeblock = None
      code_markers = ""
      while i < len(mdx_lines):
        line = mdx_lines[i]

        if "showLineMarkers" in line:
          last_start_codeblock = i
        elif last_start_codeblock:
          r = re.search(r'<(\d+)>\s*$', line)
          if r:
            number = r1.group(1)
            line_number = i + 1
            code_markers += f" {'{number}: {line_number}'}"
          elif line.startswith("```"):
            old_line = mdx_lines[last_start_codeblock]
            new_line = old_line[:old_line.index("showLineMarkers")+len("showLineMarkers")] + code_markers
            print(f"{old_line}t{new_line}\n")
            last_start_codeblock = None
            code_markers = ""

        i += 1

        # Write back the MDX file
        # with open(mdx_file, 'w') as f:
        #  f.write("".join(mdx_lines))


