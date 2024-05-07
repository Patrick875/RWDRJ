import axios from "axios";
import Cookie from "js-cookie";
import { serverUrl } from "../constants";
const instance = axios.create({ baseURL: serverUrl });

instance.interceptors.response.use(
	function (response) {
		if (response.data && response.data.user) {
			Cookie.set("token", response.data.token, { expires: 30 });
			Cookie.set(
				"user",
				JSON.stringify({
					email: response.data.user.email,
					fullname: response.data.user.fullname,
				}),
				{ expires: 30 }
			);
		}
		return response;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	}
);

export default instance;
