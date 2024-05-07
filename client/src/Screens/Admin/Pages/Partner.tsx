import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../Shared/BackButton";
import useFetchData from "../../../Hooks/UseFetchData";
import instance from "../../../API";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { img } from "../../../Shared/types";
import { fileToDataURL } from "../../../constants";

interface apipartner {
	logo: string;
	link: string;
}

function Partner() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data: partner } = useFetchData<apipartner>(`/partners/${id}`);
	const { register, control, handleSubmit } = useForm<apipartner>();
	const [images, setImages] = useState<img[]>([]);
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
	const updatePartner = async (data: apipartner) => {
		const logo = images && images.length !== 0 ? images[0].data : null;

		await instance
			.patch(`/partners/${id}`, { link: data.link, logo })
			.then((res) => {
				toast.success(res.data.message);
				navigate(-1);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	const deletePartner = async () => {
		await instance
			.delete(`/partners/${id}`)
			.then(() => {
				toast.success("Partner deleted successfully");
				navigate(-1);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	return (
		<div>
			<BackButton />

			{partner && (
				<form className="flex gap-6 p-2" onSubmit={handleSubmit(updatePartner)}>
					<div className="w-1/2 h-[70vh]">
						<img
							className="w-full block h-[60vh] object-contain rounded-[12px] "
							src={images.length !== 0 ? images[0].url : partner.logo}
						/>
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
								className="block w-full text-center mt-4 py-1 rounded-[4px] bg-sky-800 text-white"
								style={{ cursor: "pointer" }}>
								Update Image{" "}
							</label>
						</div>

						<button
							type="button"
							onClick={deletePartner}
							className="w-full mt-1 py-1 rounded-[4px] bg-pink-800 text-white">
							Remove Partner{" "}
						</button>
					</div>
					<div className="w-1/2 ">
						<div className="w-full h-full p-3 bg-white ">
							<div className="py-2">
								<label className="block my-2 font-medium text-gray-700 ">
									Link
								</label>
								<input
									type="url"
									defaultValue={partner.link}
									className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
									{...register("link")}
								/>
							</div>

							<button className="w-full mt-4 py-2 rounded-[4px] bg-teal-800 text-white">
								Update{" "}
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
}

export default Partner;
