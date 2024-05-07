//jshint esversion:9
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { HashLoader } from "react-spinners";
import instance from "../../API";
import toast from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
interface resetPassword {
	password: string;
	confirmPassword: string;
}
const ResetPassword = () => {
	const { token } = useParams();
	const { register, handleSubmit, watch } = useForm<resetPassword>();
	const password = watch("password") || "";
	const confirmPassword = watch("confirmPassword") || "";
	const [loading, setLoading] = useState<boolean | null>(null);
	const navigateToLogin = () => {
		navigate("/admin");
	};
	const navigate = useNavigate();
	const [visible, setVisible] = useState<boolean>(false);
	const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
	const resetPassword = async (data: resetPassword) => {
		setLoading(true);
		await instance
			.post("/admin/resetpassword", { ...data, token })
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

					<form
						onSubmit={handleSubmit(resetPassword)}
						className="px-8 pt-2 mx-2 p-9">
						<p className="my-3 text-lg font-bold text-center">Reset Password</p>

						<div>
							<label
								htmlFor="password"
								className="block my-2 text-xs font-medium text-gray-700 ">
								New password
							</label>
							<div className="flex w-full gap-2 bg-white border border-gray-500 rounded shadow-sm">
								<input
									type={visible ? "text" : "password"}
									className="w-[90%] px-3  focus:outline-none focus:ring-0 focus:border-none border-none py-1 bg-transparent"
									id="password"
									{...register("password")}
								/>
								{password.length > 1 && (
									<button type="button" onClick={() => setVisible(!visible)}>
										{visible ? <IoIosEyeOff /> : <IoIosEye />}
									</button>
								)}
							</div>
						</div>
						<div className="">
							<label
								htmlFor="confirmPassword"
								className="block my-2 text-xs font-medium text-gray-700 ">
								Confirm Password
							</label>
							<div className="flex w-full gap-2 bg-white border border-gray-500 rounded shadow-sm">
								<input
									type={confirmVisible ? "text" : "password"}
									className="w-[90%] border-none  focus:outline-none focus:ring-0 focus:border-none block px-3 py-1   "
									id="confirmpassword"
									{...register("confirmPassword")}
								/>
								{confirmPassword.length > 1 && (
									<button
										type="button"
										onClick={() => setConfirmVisible(!confirmVisible)}>
										{!confirmVisible ? <IoIosEye /> : <IoIosEyeOff />}
									</button>
								)}
							</div>
						</div>

						<button
							type="submit"
							disabled={confirmPassword !== password}
							className="w-full  text-xs  px-3 py-2 font-bold text-center text-white rounded-[4px] shadow-lg bg-gradient-to-t from-teal-800 to-teal-900 decoration-none my-7">
							{!loading ? (
								"Reset Password"
							) : (
								<HashLoader color="#fff" loading={loading} size={15} />
							)}
						</button>
						<Link
							to="/admin"
							className="block text-xs text-center text-sky-700 ">
							Login
						</Link>
						{confirmPassword !== password && (
							<p className="text-center text-pink-800">
								{" "}
								Passwords don't match
							</p>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
