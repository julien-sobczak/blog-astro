import { defineCollection, reference, z } from "astro:content";

const readCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    shortTitle: z.string().optional(),
    date: z.date(),
    description: z.string().optional(), // FIXME make mandatory to use in RSS feed
    author: z.string(),
    cover: z.string(),
    note: z.number(),
    stars: z.number(),
    tags: z.array(z.string()),
    unofficialTags: z.array(z.string()).optional(),
    subject: z.string().optional(),
    bookAuthors: z.string(),
    bookIsbn: z.string(),
    recommendations: z.array(reference('read')).optional(),
  })
});

const writeCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    shortTitle: z.string().optional(),
    date: z.date(),
    description: z.string().optional(), // FIXME make mandatory to use in RSS feed
    author: z.string(),
    tags: z.array(z.string()),
    unofficialTags: z.array(z.string()).optional(),
    subject: z.string(),
    recommendations: z.array(reference('write')).optional(),
  })
});

const inspectCollection = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    shortTitle: z.string().optional(),
    date: z.date(),
    description: z.string().optional(), // FIXME make mandatory to use in RSS feed
    author: z.string(),
    tags: z.array(z.string()),
    unofficialTags: z.array(z.string()).optional(),
    subject: z.string(),
    recommendations: z.array(reference('inspect')).optional(),
  })
});

export const collections = {
  read: readCollection,
  write: writeCollection,
  inspect: inspectCollection,
};
