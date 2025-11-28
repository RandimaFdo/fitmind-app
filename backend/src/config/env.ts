import 'dotenv/config'

const required = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'CLIENT_ORIGIN'] as const

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing env var: ${key}`)
  }
}

export const config = {
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  clientOrigin: process.env.CLIENT_ORIGIN!,
  tokenExpiresIn: '7d',
}
