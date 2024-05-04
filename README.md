# My Blog


## Setup

Simply run `npm install`. The following commands were run to populate the first version of `package.json`:

```sh
npm create astro@latest # Choose empty
npx astro add react
npx astro add astro-expressive-code
# To support a RSS Feed
npm install @astrojs/rss
npm install markdown-it
npm install sanitize-html
```

## 🚀 Project Structure

Blog posts are organized using different [Astro content collections](https://docs.astro.build/en/guides/content-collections/):

```text
/
├── public/
├── src/
│   └── content/
│   |   └── read/     # .md files
│   |   └── write/    # .mdx files
│   |   └── inspect/  # .mdx files
│   └── pages/
|       └── categories
|       |   └── read.astro
|       |   └── write.astro
|       |   └── inspect.astro
|       └── read
|       |   └── [...slug].astro
|       └── write
|       |   └── [...slug].astro
|       └── inspect
|       |   └── [...slug].astro
│       └── index.astro
└── package.json
```

Short posts use basic Markdown files and long posts use MDX support (admonition, custom components).

Static assets, like images, are placed in the `public/` directory.

## 🌍 Hosting

The blog is published on [GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) using the official GitHub Action.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


