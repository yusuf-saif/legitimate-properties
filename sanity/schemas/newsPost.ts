import { defineType, defineField } from 'sanity'

export const newsPostSchema = defineType({
  name: 'newsPost',
  title: 'News & Insights',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'excerpt', type: 'text', rows: 3, validation: r => r.max(200) }),
    defineField({ name: 'category', type: 'string', options: { list: ['market-insight','company-news','development-update','investment'], layout: 'radio' } }),
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString() }),
    defineField({ name: 'featuredImage', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
  ],
})
