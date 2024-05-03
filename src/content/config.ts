import { defineCollection, reference, z } from "astro:content";

const tags = [
  // Growing
  "studying", "reading", "teaching", "remembering", "leading", "writing", "learning", "understanding", "mastering", "programming", "note-taking", "reflecting", "building", "doing", "thinking", "being", "working", "living", "parenting",
  // Techniques
  "flashcards", "productivity",
] as const;

const commonProperties = {
  // Writing
  draft: z.boolean().optional(),
  author: z.string(),

  // Describing
  title: z.string(),
  shortTitle: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),

  // Organizing
  tags: z.array(z.enum(tags)).optional(),
  topics: z.array(z.string()).optional(),
  subject: z.string().optional(),

  // Publishing
  date: z.date(),

  // Referencing
  relatedReadPosts: z.array(reference('read')).optional(),
  relatedWritePosts: z.array(reference('write')).optional(),
  relatedInspectPosts: z.array(reference('inspect')).optional(),
}

const readCollection = defineCollection({
  schema: z.object({
    ...commonProperties,

    // Reading
    bookCover: z.string(),
    bookAuthors: z.string(),
    bookIsbn: z.string().optional(), // Ex: ISBN is optional on LeanPub

    // Reviewing
    note: z.number(),
    stars: z.number(),
  })
});

const writeCollection = defineCollection({
  schema: z.object({
    ...commonProperties,
    description: z.string(), // Required for the RSS feed
  })
});

const inspectCollection = defineCollection({
  schema: z.object({
    ...commonProperties,
    description: z.string(), // Required for the RSS feed
  })
});

export const collections = {
  read: readCollection,
  write: writeCollection,
  inspect: inspectCollection,
};
