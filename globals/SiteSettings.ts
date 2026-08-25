import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'email', type: 'email', required: true, defaultValue: 'hello@ecguys.com' },
    { name: 'phone', type: 'text', required: true, defaultValue: '+44 (0) 123 456 7890' },
    { name: 'locations', type: 'text', required: true, defaultValue: 'UK • Ireland • India • Gulf' },
  ],
}
