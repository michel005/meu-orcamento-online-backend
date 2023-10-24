export const Delete = (app) => {
	app.delete('/api/customer/:id', (req, res) => {
		res.status(200).send()
	})
}
