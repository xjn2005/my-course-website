import { defineCollection, z } from 'astro:content';

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    semester: z.string(),
    instructor: z.string(),
  }),
});

const guidelines = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().int().positive(),
  }),
});

const assignments = defineCollection({
  type: 'content',
  schema: z.object({}),
});

export const collections = { courses, guidelines, assignments };
