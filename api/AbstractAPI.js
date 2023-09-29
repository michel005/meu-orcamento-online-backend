const { ObjectId } = require('mongodb')

const AbstractAPI = (validate = () => ({}), entity, app, db) => {
	console.log(`Using abstract API with "${entity}"`)
	const userDatabase = db.collection(entity)

	app.get(`/${entity}`, async (req, res) => {
		try {
			const result = await userDatabase.find({}).toArray()
			res.send(result)
		} catch (err) {
			res.status(400).json(err)
		}
	})

	app.get(`/${entity}/:id`, async (req, res) => {
		try {
			const result = await userDatabase.findOne({ _id: new ObjectId(req.params.id) })
			res.send(result)
		} catch (err) {
			res.status(400).json(err)
		}
	})

	app.post(`/${entity}`, async (req, res) => {
		const errors = validate(req.body)
		if (Object.keys(errors).length > 0) {
			res.status(400).send(errors)
			return
		}
		userDatabase
			.insertOne(req.body)
			.then((response) => {
				res.status(200).send(response.insertedId)
			})
			.catch((error) => {
				res.status(400).send(error)
			})
	})

	app.put(`/${entity}/:id`, async (req, res) => {
		const x = JSON.parse(JSON.stringify(req.body))
		x._id = new ObjectId(req.params.id)

		userDatabase
			.updateOne(
				{ _id: new ObjectId(req.params.id) },
				{
					$set: x,
				}
			)
			.then(() => {
				res.status(200).send()
			})
			.catch((error) => {
				res.status(400).send(error)
			})
	})

	app.delete(`/${entity}/:id`, async (req, res) => {
		userDatabase
			.deleteOne({ _id: new ObjectId(req.params.id) })
			.then(() => {
				res.status(200).send()
			})
			.catch((error) => {
				res.status(400).send(error)
			})
	})
}

module.exports = AbstractAPI
