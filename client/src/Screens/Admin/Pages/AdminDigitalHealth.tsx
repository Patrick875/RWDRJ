// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import useFetchData from "../../../Hooks/UseFetchData";
// import { ChangeEvent, useEffect } from "react";
// import {
// 	digitalCover,
// 	digitalHealthPage,
// 	img,
// 	sectionSchema,
// } from "../../../Shared/types";
// import { IoReturnUpBackOutline } from "react-icons/io5";
// import BackButton from "../../../Shared/BackButton";
// import { fileToDataURL } from "../../../constants";
// import UpdateItemModal from "../../../Shared/UpdateItemModal";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// interface editableImage extends img {
// 	id: string;
// }

// function AdminDigitalHealth() {
// 	const { data: digitalHealthPage } =
// 		useFetchData<digitalHealthPage[]>("/digitalhealth");
// 	const [pageCoverImages, setPageCoverImages] = useState<editableImage[]>([]);
// 	const { control } = useForm();
// 	const [show, setShow] = useState<boolean>(false);
// 	const [images, setImages] = useState<editableImage[]>([]);
// 	const [subHeader1, setSubHeader1] = useState("");
// 	const [subHeader2, setSubHeader2] = useState("");
// 	const [header1, setHeader1] = useState("");
// 	const [header2, setHeader2] = useState("");
// 	const [contentText, setContentText] = useState("");
// 	const [section, setSection] = useState<sectionSchema[]>([]);
// 	const [digitalCovers, setDigitalCovers] = useState<digitalCover>([]);

// 	const handleFileChange = async (
// 		e: ChangeEvent<HTMLInputElement>,
// 		id: string
// 	) => {
// 		const files = e.target.files;
// 		let imagesArray: editableImage[] = [];

// 		if (files) {
// 			imagesArray = await Promise.all(
// 				Array.from(files).map(async (file) => {
// 					const dataUrl: string = await fileToDataURL(file);

// 					return {
// 						url: URL.createObjectURL(file),
// 						data: dataUrl,
// 						id,
// 					};
// 				})
// 			);
// 			if (id.includes("cover")) {
// 				setPageCoverImages((prevImages) => {
// 					const updatedImages = [...prevImages];
// 					const existingImageIndex = updatedImages.findIndex(
// 						(img) => img.id === id
// 					);
// 					if (existingImageIndex !== -1) {
// 						// Replace the existing images for the specific id
// 						updatedImages.splice(
// 							existingImageIndex,
// 							1,
// 							...imagesArray.filter((image) => image.id === id)
// 						);
// 					} else {
// 						// Add the new images for the specific i
// 						updatedImages.push(...imagesArray);
// 					}
// 					return updatedImages;
// 				});
// 			} else {
// 				setImages((prevImages) => {
// 					const updatedImages = [...prevImages];
// 					const existingImageIndex = updatedImages.findIndex(
// 						(img) => img.id === id
// 					);
// 					if (existingImageIndex !== -1) {
// 						// Replace the existing images for the specific id
// 						updatedImages.splice(
// 							existingImageIndex,
// 							1,
// 							...imagesArray.filter((image) => image.id === id)
// 						);
// 					} else {
// 						// Add the new images for the specific id
// 						updatedImages.push(...imagesArray);
// 					}
// 					return updatedImages;
// 				});
// 			}
// 		}
// 	};
// 	const resetImage = (id: string) => {
// 		if (id.includes("cover")) {
// 			const newImages: editableImage[] = pageCoverImages.filter(
// 				(img) => img.id !== id
// 			);
// 			setPageCoverImages([...newImages]);
// 		} else {
// 			const newImages: editableImage[] = images.filter((img) => img.id !== id);
// 			setImages([...newImages]);
// 		}
// 	};

// 	useEffect(() => {
// 		if (digitalHealthPage && digitalHealthPage.length !== 0) {
// 			setDigitalCovers([
// 				...digitalHealthPage[0].coverImages.map(
// 					(img: string, index: number) => ({
// 						id: "cover-" + index.toString(),
// 						url: img,
// 					})
// 				),
// 			]);

// 			setPageCoverImages([
// 				...digitalCovers.map((img: string, index: number) => ({
// 					id: "cover-" + index.toString(),
// 					url: img,
// 				})),
// 			]);
// 			setHeader1(digitalHealthPage[0].titles[0]);
// 			setHeader2(digitalHealthPage[0].titles[1]);
// 			setSubHeader1(`<p>${digitalHealthPage[0].subtitles[0]}</p>`);
// 			setSubHeader2(`<p>${digitalHealthPage[0].subtitles[1]}</p>`);
// 			setContentText(`<p>${digitalHealthPage[0].content}</p>`);
// 			setSection({
// 				...digitalHealthPage[0].section,
// 				content: [`<p>${digitalHealthPage[0].section.content[0]}</p>`],
// 			});
// 		}
// 	}, [digitalHealthPage]);
// 	console.log("pageCoverImages", pageCoverImages);

// 	return (
// 		<div>
// 			<BackButton />
// 			<div className="w-full ">
// 				<div className="w-full h-full p-3 bg-white ">
// 					<p className="text-2xl font-semibold"> Service Provision</p>
// 					{/* Header Image */}
// 					<div className="w-full h-[62vh]">
// 						<label className="block my-2 font-semibold text-gray-700 ">
// 							Cover Image
// 						</label>
// 						<div className="relative">
// 							<div className="absolute flex  h-[60vh] w-full bg-page-cover">
// 								<div className="flex flex-col items-center justify-center w-full gap-3">
// 									<Controller
// 										name="cover-0"
// 										control={control}
// 										defaultValue={null}
// 										render={({ field }) => (
// 											<input
// 												type="file"
// 												id="cover-0"
// 												accept="image/*"
// 												onChange={(e) => {
// 													field.onChange(e);
// 													handleFileChange(e, "cover-0");
// 												}}
// 												style={{ display: "none" }}
// 											/>
// 										)}
// 									/>
// 									<label
// 										htmlFor="cover-0"
// 										className="block  text-center  py-1 rounded-[4px] bg-white w-1/4"
// 										style={{ cursor: "pointer" }}>
// 										Change Image{" "}
// 									</label>
// 									{pageCoverImages &&
// 										digitalHealthPage &&
// 										digitalCovers &&
// 										pageCoverImages.length !== 0 &&
// 										pageCoverImages.some((img) => img.id === "cover-0") &&
// 										digitalHealthPage[0].coverImages.some(
// 											(img) => img.id === "cover-0"
// 										) &&
// 										pageCoverImages.find((img) => img.id === "cover-0")?.url !==
// 											digitalHealthPage[0].coverImages.find(
// 												(img) => img.id === "cover-0"
// 											).url && (
// 											<button
// 												type="button"
// 												onClick={() => resetImage("cover-0")}
// 												className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/4">
// 												<IoReturnUpBackOutline />
// 												Reset Image
// 											</button>
// 										)}
// 								</div>
// 							</div>
// 							{pageCoverImages &&
// 							pageCoverImages.length !== 0 &&
// 							pageCoverImages.some((img) => img.id === "cover-0") ? (
// 								<img
// 									className="block h-[60vh]  object-cover w-full  "
// 									src={
// 										pageCoverImages.find((img) => img.id === "cover-0")
// 											? pageCoverImages.find((img) => img.id === "cover-0").data
// 												? pageCoverImages.find((img) => img.id === "cover-0")
// 														.data
// 												: pageCoverImages.find((img) => img.id === "cover-0")
// 														.url
// 											: ""
// 									}
// 								/>
// 							) : (
// 								<img
// 									className="block h-[60vh]  object-cover w-full  "
// 									src={
// 										digitalHealthPage &&
// 										digitalHealthPage[0].coverImages.length !== 0
// 											? digitalHealthPage[0].coverImages[0].url
// 											: ""
// 									}
// 								/>
// 							)}
// 						</div>
// 					</div>

// 					{/* Header Text */}
// 					<div className="py-2 mt-2">
// 						<label className="block my-2 font-semibold text-gray-700 ">
// 							Header Text
// 						</label>
// 						<input
// 							defaultValue={header1}
// 							onChange={(e) => setHeader1(e.target.value)}
// 							type="text"
// 							className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 						/>
// 					</div>

// 					{/* SubHeader */}
// 					<div className="py-2">
// 						<label className="block my-2 font-semibold text-gray-700 ">
// 							SubHeader
// 						</label>
// 						<div className="h-[18vh] mb-8">
// 							<ReactQuill
// 								theme="snow"
// 								className="h-[16vh]"
// 								onChange={(content: string) => {
// 									setSubHeader1(content);
// 								}}
// 								value={subHeader1}
// 							/>
// 						</div>
// 					</div>

// 					<p className="text-2xl font-semibold"> Digital Health & SRHR</p>
// 					<div className="w-full h-[62vh]">
// 						<label className="block my-2 font-semibold text-gray-700 ">
// 							Cover Image
// 						</label>
// 						<div className="relative">
// 							<div className="absolute flex  h-[60vh] w-full bg-page-cover">
// 								<div className="flex flex-col items-center justify-center w-full gap-3">
// 									<Controller
// 										name="cover-1"
// 										control={control}
// 										defaultValue={null}
// 										render={({ field }) => (
// 											<input
// 												type="file"
// 												id="cover-1"
// 												accept="image/*"
// 												onChange={(e) => {
// 													field.onChange(e);
// 													handleFileChange(e, "cover-1");
// 												}}
// 												style={{ display: "none" }}
// 											/>
// 										)}
// 									/>
// 									<label
// 										htmlFor="cover-1"
// 										className="block  text-center  py-1 rounded-[4px] bg-white w-1/4"
// 										style={{ cursor: "pointer" }}>
// 										Change Image{" "}
// 									</label>
// 									{pageCoverImages &&
// 										digitalHealthPage &&
// 										digitalHealthPage[0].coverImages &&
// 										pageCoverImages.length !== 0 &&
// 										pageCoverImages.some((img) => img.id === "cover-1") &&
// 										digitalHealthPage[0].coverImages.some(
// 											(img) => img.id === "cover-1"
// 										) &&
// 										pageCoverImages.find((img) => img.id === "cover-1")?.url !==
// 											digitalHealthPage[0].coverImages.find(
// 												(img) => img.id === "cover-1"
// 											).url && (
// 											<button
// 												type="button"
// 												onClick={() => resetImage("cover-1")}
// 												className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/4">
// 												<IoReturnUpBackOutline />
// 												Reset Image
// 											</button>
// 										)}
// 								</div>
// 							</div>
// 							{pageCoverImages &&
// 							pageCoverImages.length !== 0 &&
// 							pageCoverImages.some((img) => img.id === "cover-1") ? (
// 								<img
// 									className="block h-[60vh]  object-cover w-full  "
// 									src={
// 										pageCoverImages.find((img) => img.id === "cover-1")
// 											? pageCoverImages.find((img) => img.id === "cover-1").data
// 												? pageCoverImages.find((img) => img.id === "cover-1")
// 														.data
// 												: pageCoverImages.find((img) => img.id === "cover-1")
// 														.url
// 											: ""
// 									}
// 								/>
// 							) : (
// 								<img
// 									className="block h-[60vh]  object-cover w-full  "
// 									src={
// 										digitalHealthPage &&
// 										digitalHealthPage[0].coverImages.length !== 0
// 											? digitalHealthPage[0].coverImages[1].url
// 											: ""
// 									}
// 								/>
// 							)}
// 						</div>
// 					</div>

// 					{/* Content */}
// 					<div className="py-2 mt-4">
// 						<label className="block my-2 font-semibold text-gray-700 ">
// 							Content
// 						</label>
// 						<div className="h-[24vh] mb-8">
// 							<ReactQuill
// 								theme="snow"
// 								className="h-[22vh]"
// 								onChange={(content: string) => {
// 									setContentText(content);
// 								}}
// 								value={contentText}
// 							/>
// 						</div>
// 					</div>

// 					{/* Header Text */}
// 					<div className="py-2 mt-2">
// 						<label className="block my-2 font-semibold text-gray-700 ">
// 							Header Text
// 						</label>
// 						<input
// 							defaultValue={header2}
// 							onChange={(e) => setHeader2(e.target.value)}
// 							type="text"
// 							className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 						/>
// 					</div>

// 					{/* SubHeader */}
// 					<div className="py-2">
// 						<label className="block my-2 font-semibold text-gray-700 ">
// 							SubHeader
// 						</label>
// 						<div className="h-[20vh] mb-8">
// 							<ReactQuill
// 								theme="snow"
// 								className="h-[18vh]"
// 								onChange={(content: string) => {
// 									setSubHeader2(content);
// 								}}
// 								value={subHeader2}
// 							/>
// 						</div>
// 					</div>

// 					{/* Sections */}
// 					{section && (
// 						<div className="flex gap-4 my-3 min-h-[40vh] mb-6">
// 							<div className="w-1/2">
// 								<div className="relative">
// 									<div className="absolute flex  h-[40vh] w-full bg-page-cover">
// 										<div className="flex flex-col items-center justify-center w-full gap-3">
// 											<Controller
// 												name="image"
// 												control={control}
// 												defaultValue={null}
// 												render={({ field }) => (
// 													<input
// 														type="file"
// 														id="image"
// 														accept="image/*"
// 														onChange={(e) => {
// 															field.onChange(e);
// 															handleFileChange(e, "image");
// 														}}
// 														style={{ display: "none" }}
// 													/>
// 												)}
// 											/>
// 											<label
// 												htmlFor="image"
// 												className="block  text-center  py-1 rounded-[4px] bg-white w-1/2"
// 												style={{ cursor: "pointer" }}>
// 												Change Image{" "}
// 											</label>
// 											{images &&
// 												images.length !== 0 &&
// 												images.some((img) => img.id === "image") && (
// 													<button
// 														type="button"
// 														onClick={() => resetImage("image")}
// 														className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/2">
// 														<IoReturnUpBackOutline />
// 														Reset Image
// 													</button>
// 												)}
// 										</div>
// 									</div>

// 									{images && images.length !== 0 ? (
// 										<img
// 											className="block h-[40vh]  object-cover w-full  "
// 											src={
// 												images.find((img) => img.id === "image")?.url ||
// 												section.coverImage
// 											}
// 										/>
// 									) : (
// 										<img
// 											className="block h-[30vh]  object-cover w-full  "
// 											src={section.coverImage}
// 										/>
// 									)}
// 								</div>
// 								{section.linkText && section.link ? (
// 									<>
// 										<div className="py-1 ">
// 											<label className="block font-semibold text-gray-700 ">
// 												Link text
// 											</label>

// 											<input
// 												defaultValue={section.linkText}
// 												onChange={
// 													(e: ChangeEvent<HTMLInputElement>) => {
// 														setSection((section) => ({
// 															...section,
// 															linkText: e.target.value,
// 														}));
// 													}
// 													//handlesSectionTitleChange(e, section.id)
// 												}
// 												type="text"
// 												className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 											/>
// 										</div>
// 										<div className="py-1 ">
// 											<label className="block font-semibold text-gray-700 ">
// 												Link
// 											</label>

// 											<input
// 												defaultValue={section.link}
// 												onChange={
// 													(e: ChangeEvent<HTMLInputElement>) => {
// 														setSection((section) => ({
// 															...section,
// 															link: e.target.value,
// 														}));
// 													}
// 													//handlesSectionTitleChange(e, section.id)
// 												}
// 												type="text"
// 												className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 											/>
// 										</div>
// 									</>
// 								) : null}
// 							</div>
// 							<div className="w-1/2 min-h-[30vh]">
// 								{section.content && section.content.length !== 0 ? (
// 									<div className="min-h-[28vh]">
// 										<div className="py-2 ">
// 											<input
// 												defaultValue={section.title}
// 												onChange={
// 													(e: ChangeEvent<HTMLInputElement>) => {
// 														setSection((section) => ({
// 															...section,
// 															title: e.target.value,
// 														}));
// 													}
// 													//handlesSectionTitleChange(e, section.id)
// 												}
// 												type="text"
// 												className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 											/>
// 										</div>
// 										<div className="min-h-[28vh]">
// 											<ReactQuill
// 												theme="snow"
// 												className="h-[26vh]"
// 												onChange={
// 													(content: string) => {
// 														setSection((section) => ({
// 															...section,
// 															content: [content],
// 														}));
// 													}
// 													//handleSectionContentChange(content, section.id)
// 												} // Use handleSectionContentChange
// 												value={section.content ? section.content[0] : ""}
// 											/>
// 										</div>
// 									</div>
// 								) : (
// 									<div>{section.content ? section.content[0] : ""}</div>
// 								)}
// 							</div>
// 						</div>
// 					)}
// 					{/* {video section} */}

// 					{/* Update Button */}
// 					<button
// 						onClick={() => {
// 							setShow(true);
// 						}}
// 						className="px-8  py-2 rounded-[4px] bg-teal-800 text-white">
// 						Update{" "}
// 					</button>
// 				</div>
// 			</div>
// 			{digitalHealthPage && digitalHealthPage.length !== 0 ? (
// 				<UpdateItemModal
// 					setShow={setShow}
// 					data={{
// 						titles: [header1, header2],
// 						subtitles: [subHeader1, subHeader2],
// 						content: contentText,
// 						coverImages: pageCoverImages.map((img) => {
// 							if (Object.keys(img).includes("data")) {
// 								return img.data;
// 							} else {
// 								return img.url;
// 							}
// 						}),

// 						section,
// 					}}
// 					show={show}
// 					updateUrl="/digitalhealth"
// 					itemId={digitalHealthPage[0]._id}
// 					itemType="Digital Health"
// 				/>
// 			) : null}
// 		</div>
// 	);
// }

// export default AdminDigitalHealth;

function AdminDigitalHealth() {
	return <div>AdminDigitalHealth</div>;
}

export default AdminDigitalHealth;
