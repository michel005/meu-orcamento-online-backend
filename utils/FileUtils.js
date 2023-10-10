export class FileUtils {
	static fileToBase64 = (file, callback) => {
		const FR = new FileReader()

		FR.addEventListener('load', (evt) => {
			callback(evt?.target?.result?.toString() || '')
		})

		FR.readAsDataURL(file)
	}
}
