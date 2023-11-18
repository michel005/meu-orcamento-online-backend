import { App } from "./App"
import { GeneralConfiguration } from "./config/GeneralConfiguration"

(BigInt.prototype as any).toJSON = function () {
	const int = Number.parseInt(this.toString())
	return int ?? this.toString()
}

new App().server.listen(GeneralConfiguration.port, () => {
	console.log(`\r\nUp in port ${GeneralConfiguration.port}`)
})
