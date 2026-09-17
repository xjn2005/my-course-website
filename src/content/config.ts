import { defineCollection, z } from 'astro:content';

const detail = z.object({
  label: z.string(),
  value: z.string(),
  href: z.string().optional(),
});

const lesson = z.object({
  kind: z.literal('lesson'),
  date: z.coerce.date(),
  number: z.number().int().positive().optional(),
  topic: z.string(),
  details: z.array(detail).default([]),
  slides: z.string().optional(),
  notes: z.string().optional(),
  video: z.string().optional(),
});

const breakRow = z.object({
  kind: z.literal('break'),
  date: z.coerce.date(),
  title: z.string(),
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    semester: z.string(),
    instructor: z.string(),
    schedule: z.array(z.discriminatedUnion('kind', [lesson, breakRow])).default([]),
  }),
});

export const collections = { courses };
