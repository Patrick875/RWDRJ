import { useParams } from "react-router-dom";
import useFetchData from "../../../Hooks/UseFetchData";
import { img, member } from "../../../Shared/types";
import { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import BackButton from "../../../Shared/BackButton";
import { fileToDataURL } from "../../../constants";
import toast from "react-hot-toast";
import instance from "../../../API";

function TeamMember() {
	const { id } = useParams();
	const { data: member } = useFetchData<member>(`/teammembers/${id}`);
	const { register, control, handleSubmit } = useForm<member>();
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
	const updateMember = async (data: member) => {
		// const filt1 = Object.keys(data.socialMedias).map((k) => ({
		// 	name: k,
		// 	link: data.socialMedias[k],
		// }));

		// data.socialMedias = filt1;

		data.image = images && images.length !== 0 ? images[0].data : "";

		if (data.image == "") {
			delete data.image;
		}

		await instance
			.patch(`/teammembers/${id}`, data)
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};
	// const [names, setNames] = useState<string | undefined>(member?.names);
	// const { title, setTitle } = useState<string | undefined>(member?.title);
	// const { socialMedias, setSocialMedias } = useState<memberSocialMedia[]>([]);

	return (
		<div>
			<BackButton />
			{member && (
				<form className="flex gap-6 p-2" onSubmit={handleSubmit(updateMember)}>
					<div className="w-1/2 h-[70vh]">
						<img
							className="w-full block h-[60vh] object-contain rounded-[12px] "
							src={images.length !== 0 ? images[0].url : member.image}
						/>
						<div className="flex-shrink-0 ">
							<Controller
								name="image"
								control={control}
								defaultValue={undefined}
								render={({ field }) => (
									<input
										type="file"
										id="image"
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
								htmlFor="image"
								className="block w-full text-center mt-4 py-1 rounded-[4px] bg-sky-800 text-white"
								style={{ cursor: "pointer" }}>
								Update Image{" "}
							</label>
						</div>

						<button className="w-full mt-1 py-1 rounded-[4px] bg-orange-800 text-white">
							Hide
						</button>
						<button className="w-full mt-1 py-1 rounded-[4px] bg-pink-800 text-white">
							Delete member{" "}
						</button>
					</div>
					<div className="w-1/2 ">
						<div className="w-full h-full p-3 bg-white ">
							<div className="py-2">
								<label className="block my-2 font-medium text-gray-700 ">
									Names
								</label>
								<input
									type="text"
									defaultValue={member.names}
									className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
									{...register("names")}
								/>
							</div>
							<div className="py-2">
								<label className="block my-2 font-medium text-gray-700 ">
									Title
								</label>
								<input
									type="text"
									defaultValue={member.title}
									className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
									{...register("title")}
								/>
							</div>
							{/* {<div className="py-2">
								<p className="">Social medias</p>
								<div>
									<label className="block my-2 font-semibold text-gray-700 ">
										Facebook
									</label>
									<input
										type="text"
										defaultValue={
											member.socialMedias
												? member.socialMedias.find(
														(el) => el.name === "facebook"
												  ).link
												: ""
										}
										className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
										{...register("socialMedias.facebook")}
									/>
								</div>
								<div>
									<label className="block my-2 font-semibold text-gray-700 ">
										Twitter / X
									</label>
									<input
										type="text"
										defaultValue={
											member.socialMedias
												? member.socialMedias.find(
														(el) => el.name === "twitter"
												  ).link
												: ""
										}
										className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
										{...register("socialMedias.twitter")}
									/>
								</div>
								<div>
									<label className="block my-2 font-semibold text-gray-700 ">
										Instagram
									</label>
									<input
										type="text"
										defaultValue={
											member.socialMedias
												? member.socialMedias.find(
														(el) => el.name === "instagram"
												  ).link
												: ""
										}
										className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
										{...register("socialMedias.instagram")}
									/>
								</div>
								<div>
									<label className="block my-2 font-semibold text-gray-700 ">
										LinkedIn
									</label>
									<input
										type="text"
										defaultValue={
											member.socialMedias
												? member.socialMedias.find(
														(el) => el.name === "linkedin"
												  ).link
												: ""
										}
										className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
										{...register("socialMedias.linkedin")}
									/>
								</div>
							</div>} */}
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

export default TeamMember;
