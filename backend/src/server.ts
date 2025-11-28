import { app } from './app'
import { connectDatabase } from './database/connection'
import { config } from './config/env'

void (async () => {
  await connectDatabase()
  app.listen(config.port, () => {
    console.log(`🚀 FitMind API running on port ${config.port}`)
  })
})()
