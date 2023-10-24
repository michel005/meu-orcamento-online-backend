export const Delete = (app) => {
	app.delete('/api/product/:id', (req, res) => {
		req.database.product.remove(req.params.id)
		res.status(200).send()
	})
}
