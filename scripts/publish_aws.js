const AWS = require('aws-sdk')
const fs = require('fs')
const { exec } = require('child_process')

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: 'us-east-1',
})

const allFiles = fs.readdirSync('./dist')
const s3 = new AWS.S3()
allFiles.forEach((file) => {
	s3.upload(
		{
			Bucket: 'meu-orcamento-online-backend',
			Key: file,
			Body: fs.readFileSync(`./${file}`),
		},
		(err, data) => {
			if (err) {
				console.error('Erro ao fazer upload:', err)
			} else {
				console.log('Upload bem-sucedido. URL do objeto:', data.Location)
			}
		}
	)
})
