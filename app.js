import express from 'express'
import { GeneralConfiguration } from './config/GeneralConfiguration.js'
import cors from 'cors'
import { Authentication } from './middlewares/authentication.js'
import { Databases } from './middlewares/databases.js'
import { MongoClient } from 'mongodb'
import { MongoDBConfiguration } from './config/MongoDBConfiguration.js'
import { UserRoute } from './routes/api/user.route.js'

const databaseClient = new MongoClient(MongoDBConfiguration.url)

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors())
app.use(Databases(databaseClient))
app.use(Authentication)
app.use(UserRoute)

app.listen(GeneralConfiguration.port, () => {
	console.log(`\r\nUp in port ${GeneralConfiguration.port}`)
})
