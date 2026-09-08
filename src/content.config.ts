import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notas' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string(),
    fecha: z.string(),
    actualizada: z.string().optional(),
    pais: z.string().optional(),
    lectura: z.number().default(4)
  })
});

export const collections = { notas };
