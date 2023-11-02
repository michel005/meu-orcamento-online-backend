export const Delete = (app) => {
	app.delete('/api/customer/:id', async (req, res) => {
		await req.database.customer.remove(req.params.id)
		res.status(200).send()
	})
}
