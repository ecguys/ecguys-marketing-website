import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: { description: 'Lucide icon name, e.g. FileCode' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Business', value: 'business' },
        { label: 'Career', value: 'career' },
      ],
    },
  ],
}
