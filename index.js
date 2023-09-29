const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const AbstractAPI = require('./api/AbstractAPI')
const app = express()
const bodyParser = require('body-parser')

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri)
client
	.connect()
	.then(() => {
		console.log('MongoDB Connected')
		const db = client.db('meuOrcamentoOnline')
		app.use(cors())
		app.listen(8080, () => {
			console.log('Meu Orçamento Online (8080)')
		})
		app.use(bodyParser.json({ limit: '50mb' }))
		app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

		AbstractAPI(() => ({}), 'user', app, db)
		AbstractAPI(() => ({}), 'customer', app, db)
		AbstractAPI(() => ({}), 'budget', app, db)
	})
	.catch((err) => {
		console.log(err)
	})
