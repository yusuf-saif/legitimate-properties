import { defineType, defineField } from 'sanity'

export const propertySchema = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'type', title: 'Type', type: 'string', options: { list: ['residential','commercial','land','mixed-use'], layout: 'radio' }, validation: r => r.required() }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['available','sold','reserved','off-plan'], layout: 'radio' }, initialValue: 'available' }),
    defineField({ name: 'featured', title: 'Featured on Homepage?', type: 'boolean', initialValue: false }),
    defineField({ name: 'location', title: 'Location', type: 'object', fields: [
      { name: 'area', title: 'Area / Estate', type: 'string' },
      { name: 'city', title: 'City', type: 'string' },
      { name: 'state', title: 'State', type: 'string' },
    ]}),
    defineField({ name: 'price', title: 'Price (₦)', type: 'number' }),
    defineField({ name: 'priceOnRequest', title: 'Price on Request?', type: 'boolean', initialValue: false }),
    defineField({ name: 'specs', title: 'Specifications', type: 'object', fields: [
      { name: 'bedrooms',  title: 'Bedrooms',  type: 'number' },
      { name: 'bathrooms', title: 'Bathrooms', type: 'number' },
      { name: 'sqm',       title: 'Floor Area (m²)', type: 'number' },
      { name: 'parking',   title: 'Parking Spaces', type: 'number' },
    ]}),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [
      { name: 'alt', type: 'string', title: 'Alt Text' },
      { name: 'caption', type: 'string', title: 'Caption' },
    ]}]}),
  ],
  orderings: [{ title: 'Featured First', name: 'featuredDesc', by: [{ field: 'featured', direction: 'desc' }, { field: '_createdAt', direction: 'desc' }] }],
})
