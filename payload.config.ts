import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'

import { Users } from './collections/Users.ts'
import { Leads } from './collections/Leads.ts'
import { Services } from './collections/Services.ts'
import { Testimonials } from './collections/Testimonials.ts'
import { SiteSettings } from './globals/SiteSettings.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Leads, Services, Testimonials],
  globals: [SiteSettings],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Keep Payload's tables in their own schema so they never collide
    // with anything already in the Supabase project's `public` schema.
    schemaName: 'payload',
  }),
})
