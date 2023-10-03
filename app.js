import express from 'express'
import { GeneralConfiguration } from './config/GeneralConfiguration.js'
import { Api } from './routes/api/index.js'

const app = express()
app.use(express.json())
Api(app)
app.listen(GeneralConfiguration.port, () => {
	console.log(`Meu Orçamento Online (port ${GeneralConfiguration.port})`)
})
