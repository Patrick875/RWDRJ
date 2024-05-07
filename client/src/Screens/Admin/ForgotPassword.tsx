//jshint esversion:9
import { useState } from "react";
import { useForm } from "react-hook-form";
import instance from "../../API";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
interface forgotPassword {
	email: string;
}
const ForgotPassword = () => {
	const { register, handleSubmit } = useForm<forgotPassword>();
	const [loading, setLoading] = useState<boolean | null>(null);
	const navigateToLogin = () => {
		navigate("/admin");
	};
	const navigate = useNavigate();

	const login = async (data: forgotPassword) => {
		setLoading(true);
		await instance
			.post("/admin/forgotpassword", { ...data })
			.then((res) => {
				toast.success(res.data.message);
				navigateToLogin();
			})
			.catch((err) => {
				toast.error(err.response.data.message);
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
						<p className="my-3 text-lg font-bold text-center">
							Forgot Password
						</p>

						<div>
							<label
								htmlFor="id"
								className="block my-2 text-xs font-medium text-gray-700 ">
								Email
							</label>
							<input
								type="email"
								className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
								id="email"
								{...register("email")}
							/>
						</div>

						<button
							type="submit"
							className="w-full  text-xs  px-3 py-2 font-bold text-center text-white rounded-[4px] shadow-lg bg-gradient-to-t from-teal-800 to-teal-900 decoration-none my-7">
							{!loading ? (
								"Submit"
							) : (
								<HashLoader color="#fff" loading={loading} size={15} />
							)}
						</button>
						<p>
							<Link to="/admin" className="text-center text-sky-700">
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
