import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable !')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()

    const databaseUrl = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    const passwordHash = await hash('admin', 8)

    await prisma.user.create({
      data: {
        name: 'admin',
        email: 'admin@rentx.com',
        driver_license: '123.456.789.12',
        password: passwordHash,
        isAdmin: true,
      },
    })

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`
          DROP SCHEMA IF EXISTS "${schema}" CASCADE
        `)

        await prisma.$disconnect()
      },
    }
  },
}
