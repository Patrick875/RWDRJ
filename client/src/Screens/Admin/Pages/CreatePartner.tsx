import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apipartner, img } from "../../../Shared/types";
import { fileToDataURL } from "../../../constants";
import instance from "../../../API";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

function CreatePartner() {
	const navigate = useNavigate();

	const { register, control, handleSubmit } = useForm<apipartner>();
	const [images, setImages] = useState<img[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		let imagesArray: img[] = [];

		if (files) {
			imagesArray = await Promise.all(
				Array.from(files).map(async (file) => {
					const dataUrl: string = await fileToDataURL(file);
					return {
						url: URL.createObjectURL(file),
						data: dataUrl,
					};
				})
			);
		}
		setImages([...imagesArray]);
	};
	const createPartner = async (data: apipartner) => {
		setLoading(true);

		const logo = images && images.length !== 0 ? images[0].data : undefined;

		await instance
			.post(`/partners/`, { ...data, logo })
			.then((res) => {
				toast.success(res.data.message);
				navigate(-1);
			})
			.catch((err) => {
				console.log("err", err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<form
			onSubmit={handleSubmit(createPartner)}
			className="w-full mx-auto text-xs rounded-md md:w-2/3">
			<div className="p-4 bg-white">
				<div className="w-full p-4 text-xs  rounded-[4px]">
					<p className="my-2 text-xs font-bold">Logo</p>
					<div className="flex gap-2">
						{images.length !== 0 && (
							<div className="grid grid-cols-3 gap-2 ">
								{images.map((image, index) => (
									<img
										key={index}
										src={image.url}
										alt={`Uploaded Image ${index}`}
										className="cursor-pointer"
										onClick={() => {
											setImages([
												...images.filter((img) => img.url !== image.url),
											]);
										}}
										style={{
											maxWidth: "100px",
											maxHeight: "100px",
											margin: "5px",
										}}
									/>
								))}
							</div>
						)}

						<div className="flex-shrink-0 ">
							<Controller
								name="logo"
								control={control}
								defaultValue={undefined}
								render={({ field }) => (
									<input
										type="file"
										id="logo"
										accept="image/*"
										onChange={(e) => {
											field.onChange(e);
											handleFileChange(e);
										}}
										style={{ display: "none" }}
									/>
								)}
							/>
							<label
								htmlFor="logo"
								className={`flex items-center justify-center  ${
									images.length === 0
										? "text-2xl p-6"
										: " p-2 text-lg uppercase"
								}  bg-gray-300 rounded-md text-sky-800`}
								style={{ cursor: "pointer" }}>
								{images.length === 0 ? "+" : "change image"}
							</label>
						</div>
					</div>
				</div>
				<div>
					<label htmlFor="" className="block my-2 font-medium capitalize ">
						Link
					</label>
					<input
						type="text"
						{...register("link")}
						className=" py-1 rounded-[4px] w-full text-xs bg-transparent border-2 border-gray-300"
					/>
				</div>
			</div>

			<div className="justify-start w-full mt-4 md:flex">
				<button
					type="submit"
					disabled={loading}
					className={`w-full  md:w-1/6  py-1 my-1 text-xs ${
						!loading ? "text-white bg-teal-900" : "bg-teal-100"
					} rounded-[4px] `}>
					{!loading ? (
						"Create"
					) : (
						<HashLoader color="#022c22" loading={loading} size={15} />
					)}
				</button>
			</div>
		</form>
	);
}

export default CreatePartner;
