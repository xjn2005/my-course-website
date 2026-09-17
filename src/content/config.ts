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

const material = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
});

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    semester: z.string(),
    instructor: z.string(),
    description: z.string().optional(),
    materials: z.array(material).default([]),
    schedule: z.array(z.discriminatedUnion('kind', [lesson, breakRow])).default([]),
  }),
});

const assignments = defineCollection({
  type: 'content',
  schema: z.object({
    course: z.string(),
    title: z.string(),
    date: z.coerce.date(),
    pdf: z.string().optional(),
    attachment: z.string().optional(),
    solutions: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { courses, assignments, blog };
