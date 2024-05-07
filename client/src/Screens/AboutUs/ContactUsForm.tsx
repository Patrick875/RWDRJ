import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";
import { HashLoader } from "react-spinners";

function ContactUsForm() {
	const { register, reset } = useForm();
	const handleOnFocus = () => {
		reset();
	};

	const [loading] = useState<boolean>(false);
	return (
		<>
			<p className="text-xl font-bold text-gray-600">Send us a message</p>
			<p className="text-xs ">
				Feel to send an email, we will respond as soon as possible{" "}
			</p>
			<form>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Name"
					{...register("name")}
					onFocus={handleOnFocus}
				/>
				<input
					className="w-full px-3 py-1 my-3 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="email"
					placeholder="Email"
					{...register("email")}
					onFocus={handleOnFocus}
				/>
				<input
					className="w-full px-3 py-1 my-1 font-light border border-gray-300 rounded-md placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
					type="text"
					placeholder="Subject"
					{...register("subject")}
					onFocus={handleOnFocus}
				/>
				<textarea
					{...register("description")}
					id="description"
					placeholder="Message"
					rows={8}
					className=" py-1 rounded-[4px] w-full border-2 border-gray-300"
				/>
				<button
					type="button"
					disabled={loading}
					className={`px-4    py-1 my-1 text-xs ${
						!loading ? "text-white bg-teal-900" : "bg-teal-100"
					} rounded-[4px] `}>
					{!loading ? (
						<p className="flex items-center gap-3">
							Send
							<FiSend />
						</p>
					) : (
						<HashLoader color="#022c22" loading={loading} size={15} />
					)}
				</button>
			</form>
		</>
	);
}

export default ContactUsForm;
