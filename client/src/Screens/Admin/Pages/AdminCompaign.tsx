import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useFetchData from "../../../Hooks/UseFetchData";
import { ChangeEvent, useEffect } from "react";
import { compaignPage, img, sectionSchema } from "../../../Shared/types";
import { IoReturnUpBackOutline } from "react-icons/io5";
import BackButton from "../../../Shared/BackButton";
import { fileToDataURL } from "../../../constants";
import UpdateItemModal from "../../../Shared/UpdateItemModal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface editableSection extends sectionSchema {
	id: string;
}
interface editableImage extends img {
	id: string;
}

function AdminCompaign() {
	const { data: compaignPage } = useFetchData<compaignPage[]>("/compaign");
	const { control } = useForm();
	const [show, setShow] = useState<boolean>(false);
	const [images, setImages] = useState<editableImage[]>([]);
	const [headerText, setHeaderText] = useState<string>("");
	const [editorText, setEditorText] = useState("");
	const [pageContent, setPageContent] = useState("");

	const handleFileChange = async (
		e: ChangeEvent<HTMLInputElement>,
		id: string
	) => {
		const files = e.target.files;
		let imagesArray: editableImage[] = [];

		if (files) {
			imagesArray = await Promise.all(
				Array.from(files).map(async (file) => {
					const dataUrl: string = await fileToDataURL(file);

					return {
						url: URL.createObjectURL(file),
						data: dataUrl,
						id,
					};
				})
			);

			// Update the state while preserving other images
			setImages((prevImages) => {
				const updatedImages = [...prevImages];
				const existingImageIndex = updatedImages.findIndex(
					(img) => img.id === id
				);
				if (existingImageIndex !== -1) {
					// Replace the existing images for the specific id
					updatedImages.splice(
						existingImageIndex,
						1,
						...imagesArray.filter((image) => image.id === id)
					);
				} else {
					// Add the new images for the specific id
					updatedImages.push(...imagesArray);
				}
				return updatedImages;
			});
		}
	};
	const resetImage = (id: string) => {
		const newImages: editableImage[] = images.filter((img) => img.id !== id);
		setImages([...newImages]);
	};

	useEffect(() => {
		if (compaignPage && compaignPage.length !== 0) {
			setHeaderText(compaignPage[0].title);
			setEditorText(`<p>${compaignPage[0].subtitle}</p>`);
			setPageContent(`<p>${compaignPage[0].content[0].content}</p>`);
		}
	}, [compaignPage]);

	return (
		<div>
			<BackButton />
			<div className="w-full min-h-[100vh]">
				<div className="w-full h-full p-3 bg-white ">
					{/* Header Image */}
					<div className="w-full h-[62vh]">
						<label className="block my-2 font-medium text-gray-700 ">
							Header Image
						</label>
						<div className="relative">
							<div className="absolute flex  h-[60vh] w-full bg-page-cover">
								<div className="flex flex-col items-center justify-center w-full gap-3">
									<Controller
										name="image"
										control={control}
										defaultValue={null}
										render={({ field }) => (
											<input
												type="file"
												id="image"
												accept="image/*"
												onChange={(e) => {
													field.onChange(e);
													handleFileChange(e, "cover-image");
												}}
												style={{ display: "none" }}
											/>
										)}
									/>
									<label
										htmlFor="image"
										className="block  text-center  py-1 rounded-[4px] bg-white w-1/4"
										style={{ cursor: "pointer" }}>
										Change Image{" "}
									</label>
									{images &&
										images.length !== 0 &&
										images.some((img) => img.id === "cover-image") && (
											<button
												type="button"
												onClick={() => resetImage("cover-image")}
												className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/4">
												<IoReturnUpBackOutline />
												Reset Image
											</button>
										)}
								</div>
							</div>
							{images &&
							images.length !== 0 &&
							images.some((img) => img.id === "cover-image") ? (
								<img
									className="block h-[60vh]  object-cover w-full  "
									src={images.find((img) => img.id === "cover-image")?.data}
								/>
							) : (
								<img
									className="block h-[60vh]  object-cover w-full  "
									src={
										compaignPage &&
										compaignPage.length !== 0 &&
										compaignPage[0].coverImage
											? compaignPage[0].coverImage
											: ""
									}
								/>
							)}
						</div>
					</div>

					{/* Header Text */}
					<div className="py-2 mt-2">
						<label className="block my-2 font-medium text-gray-700 ">
							Header Text
						</label>
						<input
							defaultValue={headerText}
							onChange={(e) => setHeaderText(e.target.value)}
							type="text"
							className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>

					{/* SubHeader */}
					<div className="py-2">
						<label className="block my-2 font-medium text-gray-700 ">
							SubHeader
						</label>
						<div className="h-[9vh] mb-8">
							<ReactQuill
								theme="snow"
								onChange={(content: string) => {
									setEditorText(content);
								}}
								value={editorText}
							/>
						</div>
					</div>
					<div className="py-2">
						<label className="block my-2 font-medium text-gray-700 ">
							Content
						</label>
						<div className="h-[26vh] mb-8">
							<ReactQuill
								className="h-[26vh]"
								theme="snow"
								onChange={(content: string) => {
									setPageContent(content);
								}}
								value={pageContent}
							/>
						</div>
					</div>

					{/* Update Button */}
					<button
						onClick={() => {
							setShow(true);
						}}
						className="px-8 mt-4 py-2 rounded-[4px] bg-teal-800 text-white">
						Update{" "}
					</button>
				</div>
			</div>
			{compaignPage && compaignPage.length !== 0 ? (
				<UpdateItemModal
					setShow={setShow}
					data={{
						title: headerText,
						subtitle: editorText,
						coverImage:
							images && images.length !== 0
								? images.find((img) => img.id === "cover-image")?.data
								: compaignPage[0].coverImage,
						content: [{ content: pageContent }],
					}}
					show={show}
					updateUrl="/compaign"
					itemId={compaignPage[0]._id}
					itemType="Compaign Page"
				/>
			) : null}
		</div>
	);
}

export default AdminCompaign;
