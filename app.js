import express from 'express'
import { GeneralConfiguration } from './config/GeneralConfiguration.js'
import cors from 'cors'
import { Authentication } from './middlewares/authentication.js'
import { Databases } from './middlewares/databases.js'
import { UserRoute } from './routes/api/user.route.js'
import { PrismaClient } from '@prisma/client'
import { CustomerRoute } from './routes/api/customer.route.js'

const prisma = new PrismaClient()
const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors())
app.use(Databases(prisma))
app.use(Authentication)
app.use(express.static('/uploads'))
app.use(UserRoute)
app.use(CustomerRoute)

app.listen(GeneralConfiguration.port, () => {
	console.log(`\r\nUp in port ${GeneralConfiguration.port}`)
})
