import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get() {
  const postsRead = await getCollection('read');
  const postsWrite = await getCollection('write');
  const postsInspect = await getCollection('inspect');

  const posts = [...postsRead, ...postsWrite, ...postsInspect]

  return rss({
    title: 'Julien Sobczak | Blog',
    description: 'Diary of a Life Long Learner',
    site: 'https://juliensobczak.com',
    items: posts.map((post) => ({
      title: post.data.title,
      date: post.data.date,
      description: post.data.description,
      link: `/read/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
