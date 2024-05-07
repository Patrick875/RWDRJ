//jshint esversion:9
import { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../../API";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { HashLoader } from "react-spinners";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
interface login {
	email: string;
	password: string;
}
const Login = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const { register, handleSubmit, watch } = useForm<login>();
	const [error, setError] = useState<boolean | null>(false);
	const [message, setMessage] = useState<boolean | null>(null);
	const [loading, setLoading] = useState<boolean | null>(null);
	const password = watch("password") || "";
	const navigateToDashboard = () => {
		navigate("dashboard");
	};
	const navigate = useNavigate();
	const handleOnFocus = () => {
		setError(null);
		setMessage(null);
	};
	const login = async (data: login) => {
		setLoading(true);
		await instance
			.post("/admin/login", { ...data })
			.then((res) => {
				console.log("res", res);
				navigateToDashboard();
			})
			.catch((err) => {
				console.log(err);
				setError(true);
				setMessage(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="max-h-screen mx-auto ">
			<div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
				<div className="md:w-[30%] w-[80%] shadow-lg  rounded-lg bg-slate-50">
					<div className="flex justify-center w-full my-1">
						<div>
							<div className="flex items-center gap-2">
								<img
									loading="lazy"
									className="block w-20 h-20"
									src={Logo}
									alt="hike-guide-logo"
								/>
								<p className="text-lg font-bold text-primary-orange">RWDRJ</p>
							</div>
						</div>
					</div>

					<form onSubmit={handleSubmit(login)} className="px-8 pt-2 mx-2 p-9">
						<p className="my-3 text-lg font-bold text-center">Login</p>
						<div>
							<label
								htmlFor="id"
								className="block my-2 text-xs font-medium text-gray-700 ">
								Email
							</label>
							<input
								type="email"
								onFocus={handleOnFocus}
								className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="email"
								{...register("email")}
							/>
						</div>
						<div className="">
							<label
								htmlFor="password"
								className="block my-2 text-xs font-medium text-gray-700 ">
								Password
							</label>
							<div className="flex w-full gap-2 bg-white border border-gray-500 rounded shadow-sm">
								<input
									type={visible ? "text" : "password"}
									className="w-[90%] px-3  focus:outline-none focus:ring-0 focus:border-none border-none py-1 bg-transparent"
									id="password"
									{...register("password")}
								/>
								{password && password.length > 1 && (
									<button
										className="focus:outline-none focus:ring-0"
										type="button"
										onClick={() => setVisible(!visible)}>
										{visible ? <IoIosEyeOff /> : <IoIosEye />}
									</button>
								)}
							</div>
						</div>

						<button
							type="submit"
							className="w-full  text-xs  px-3 py-2 font-bold text-center text-white rounded-[4px] shadow-lg bg-gradient-to-t from-teal-800 to-teal-900 decoration-none my-7">
							{!loading ? (
								"Login"
							) : (
								<HashLoader color="#fff" loading={loading} size={15} />
							)}
						</button>
						<p className="text-center">
							Forgot your password ?
							<Link
								to="forgotpassword"
								className="text-center ps-2 text-sky-700">
								Click here
							</Link>
						</p>
					</form>
					{error && (
						<p className="flex items-center justify-center pb-4 ">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5 text-pink-700">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
								/>
							</svg>

							<span className="text-sm text-pink-700 ps-4">{message}</span>
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
