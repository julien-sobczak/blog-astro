import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

const sortByDate = (a, b) => {
  return new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
}

export async function GET(context) {
  const postsRead = await getCollection('read');
  const postsWrite = await getCollection('write');
  const postsInspect = await getCollection('inspect');

  // Include full content for book reviews
  // https://docs.astro.build/en/guides/rss/#including-full-post-content
  const entriesRead = postsRead.map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    link: `/${post.collection}/${post.slug}/`,
    content: sanitizeHtml(parser.render(post.body), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
    }),
  }));
  // Include description for longer posts
  const entriesOthers = [...postsWrite, ...postsInspect].map((post) => ({
    title: post.data.title,
    pubDate: post.data.date,
    link: `/${post.collection}/${post.slug}/`,
    description: post.data.description,
  }));

  return rss({
    title: 'Julien Sobczak | Blog',
    description: 'Diary of a Life Long Learner',
    site: context.site,
    items: [...entriesRead, ...entriesOthers].sort(sortByDate),
    customData: `<language>en-us</language>`,

    // Match blog URLs
    // See https://docs.astro.build/en/guides/rss/#removing-trailing-slashes
    trailingSlash: false,

    // Style RSS feed in the browser
    // See https://docs.astro.build/en/guides/rss/#adding-a-stylesheet
    stylesheet: '/rss/styles.xsl',
    // Downloaded from https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl
  });
}
