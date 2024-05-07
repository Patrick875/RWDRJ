import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SiteData, img } from "../../../Shared/types";
import { fileToDataURL } from "../../../constants";

import useFetchData from "../../../Hooks/UseFetchData";
import { IoIosLock } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import UpdateItemModal from "../../../Shared/UpdateItemModal";

function GeneralInfo() {
	const { data: sitedata } = useFetchData<SiteData[]>("/");
	const [updating, setUpdating] = useState<boolean>(false);
	const { control } = useForm<SiteData>();
	const [title, setTitle] = useState<string>(
		sitedata && sitedata[0].title ? sitedata[0].title : ""
	);
	const [subtitle, setSubtitle] = useState<string>(
		sitedata && sitedata[0].subtitle ? sitedata[0].subtitle : ""
	);
	const [images, setImages] = useState<img[]>([]);
	const [show, setShow] = useState<boolean>(false);
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
	const updateInfo = () => {
		const formData = { title, subtitle };

		const logo = images && images.length !== 0 ? images[0].data : null;
		return { ...formData, logo };
	};
	useEffect(() => {
		if (sitedata && sitedata.length !== 0) {
			setTitle(sitedata[0].title);
			setSubtitle(sitedata[0].subtitle);
		}
	}, [sitedata]);
	return (
		<div className="p-2">
			<form className="w-full mx-auto text-xs rounded-md md:w-2/3">
				<div className="p-4 bg-white">
					<div>
						<label htmlFor="" className="block my-2 font-medium capitalize ">
							Site title
						</label>
						<input
							type="text"
							readOnly={!updating}
							onChange={(e) => setTitle(e.target.value)}
							defaultValue={title}
							className=" py-1 rounded-[4px] w-full text-xs bg-transparent border-2 border-gray-300"
						/>
					</div>
					<div>
						<label htmlFor="" className="block my-2 font-medium capitalize ">
							Site Moto
						</label>
						<input
							type="text"
							readOnly={!updating}
							onChange={(e) => setSubtitle(e.target.value)}
							defaultValue={subtitle}
							className=" py-1 rounded-[4px] w-full text-xs bg-transparent border-2 border-gray-300"
						/>
					</div>
					<div>
						<p className="my-2 text-xs font-bold">Current Logo</p>
						<img
							src={sitedata && sitedata[0] ? sitedata[0].logo : ""}
							alt="logo"
							className="object-contain h-18"
						/>
					</div>
					{updating && (
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
					)}
				</div>

				<div className="justify-start w-full mt-4 md:flex">
					{updating ? (
						<div className="flex items-center w-full gap-4 ">
							<button
								type="button"
								onClick={() => {
									setShow(true);
								}}
								className=" flex justify-center w-1/6 px-2 py-1 my-1 text-xs text-white bg-teal-900 rounded-[4px] ">
								Update
							</button>
							<button
								onClick={() => {
									setUpdating(false);
								}}
								className="flex items-center rounded-[4px] justify-center w-1/6 gap-2 py-1 text-white bg-orange-800">
								Cancel
								<ImCancelCircle />
							</button>
						</div>
					) : (
						<button
							type="button"
							onClick={() => setUpdating(true)}
							className="w-full flex justify-center  gap-1 items-center md:w-1/6  py-1 my-1 text-xs text-white bg-pink-900 rounded-[4px] ">
							<IoIosLock />
							Unlock to edit
						</button>
					)}
				</div>
			</form>
			{sitedata && sitedata[0] && (
				<UpdateItemModal
					show={show}
					setShow={setShow}
					updateUrl=""
					data={updateInfo()}
					itemType="site info "
					itemId={sitedata[0]._id}
				/>
			)}
		</div>
	);
}

export default GeneralInfo;
