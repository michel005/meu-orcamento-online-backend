import axios from 'axios'

export default axios.create({
	baseURL: process.env[`REACT_APP_${process.env.REACT_APP_CURRENT_PROFILE}_URL`],
})
