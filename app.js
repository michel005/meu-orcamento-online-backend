import express from 'express'
import { GeneralConfiguration } from './config/GeneralConfiguration.js'
import { Api } from './routes/api/index.js'
import cors from 'cors'
import { Authentication } from './middlewares/authentication.js'

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json())
app.use(cors())
app.use(Authentication)
Api(app)

app.listen(GeneralConfiguration.port, () => {
	console.log(`\r\nMeu Orçamento Online Backend\r\n`)

	app._router.stack
		.filter((x) => x.route)
		.forEach((x) => {
			console.log(x.route.path, Object.keys(x.route.methods))
		})
	console.log(`\r\nUp in port ${GeneralConfiguration.port}`)
})
