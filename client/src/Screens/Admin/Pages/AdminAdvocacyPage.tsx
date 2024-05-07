import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useFetchData from "../../../Hooks/UseFetchData";
import { ChangeEvent, useEffect } from "react";
import { advocacyPage, img, sectionSchema } from "../../../Shared/types";
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
function AdminAdvocacyPage() {
	const { data: advocacyPage } = useFetchData<advocacyPage[]>("/advocacy");
	const { control } = useForm();
	const [show, setShow] = useState<boolean>(false);
	const [images, setImages] = useState<editableImage[]>([]);
	const [headerText, setHeaderText] = useState<string>("");
	const [editorText, setEditorText] = useState("");
	const [sections, setSections] = useState<editableSection[]>([]);

	// Modify the onChange event handler for header text

	const handlesSectionTitleChange = (
		e: ChangeEvent<HTMLInputElement>,
		id: string | undefined
	) => {
		const updatedSections = sections.map((sect: editableSection) =>
			sect.id === id ? { ...sect, title: e.target.value } : sect
		);
		setSections(updatedSections);
	};

	// Modify the onChange event handler for section content
	const handleSectionContentChange = (content: string, sectionId: string) => {
		const updatedSections = sections.map((sect: editableSection) =>
			sect.id === sectionId ? { ...sect, content: content } : sect
		);
		setSections(updatedSections);
	};
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
		if (advocacyPage && advocacyPage.length !== 0) {
			setHeaderText(advocacyPage[0].title);
			setEditorText(`<p>${advocacyPage[0].subtitle}</p>`);
			setSections(
				advocacyPage[0].sections.map((el: sectionSchema, index: number) => ({
					...el,
					id: index.toString(),
					content: `<p>${el.content}</p>`,
				}))
			);
		}
	}, [advocacyPage]);

	return (
		<div>
			<BackButton />
			<div className="w-full ">
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
										advocacyPage &&
										advocacyPage.length !== 0 &&
										advocacyPage[0].coverImage
											? advocacyPage[0].coverImage
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

					{/* Sections */}
					{sections &&
						sections.map((section: editableSection, index: number) => (
							<div className="flex gap-4 my-3" key={index}>
								<div className="w-1/2">
									<div className="relative">
										<div className="absolute flex  h-[30vh] w-full bg-page-cover">
											<div className="flex flex-col items-center justify-center w-full gap-3">
												<Controller
													name={`${index}`}
													control={control}
													defaultValue={null}
													render={({ field }) => (
														<input
															type="file"
															id={`${index}`}
															accept="image/*"
															onChange={(e) => {
																field.onChange(e);
																handleFileChange(e, `${index}`);
															}}
															style={{ display: "none" }}
														/>
													)}
												/>
												<label
													htmlFor={`${index}`}
													className="block  text-center  py-1 rounded-[4px] bg-white w-1/4"
													style={{ cursor: "pointer" }}>
													Change Image{" "}
												</label>
												{images &&
													images.length !== 0 &&
													images.some((img) => img.id === section.id) && (
														<button
															type="button"
															onClick={() => resetImage(section.id)}
															className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/4">
															<IoReturnUpBackOutline />
															Reset Image
														</button>
													)}
											</div>
										</div>

										{images && images.length !== 0 ? (
											<img
												className="block h-[30vh]  object-cover w-full  "
												src={
													images.find((img) => img.id === section.id)?.url ||
													section.coverImage
												}
											/>
										) : (
											<img
												className="block h-[30vh]  object-cover w-full  "
												src={section.coverImage}
											/>
										)}
									</div>
								</div>
								<div className="w-1/2">
									<label className="block font-medium text-gray-700 ">
										Title
									</label>
									<input
										defaultValue={section.title}
										onChange={(e) => handlesSectionTitleChange(e, section.id)}
										type="text"
										className="w-full px-3 py-1 mb-3 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
									/>
									{section.content && section.content.length !== 0 ? (
										<ReactQuill
											theme="snow"
											className="h-[14vh]"
											onChange={(content: string) =>
												handleSectionContentChange(content, section.id)
											} // Use handleSectionContentChange
											value={section.content}
										/>
									) : (
										<div>{section.content}</div>
									)}
								</div>
							</div>
						))}

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
			{advocacyPage && advocacyPage.length !== 0 ? (
				<UpdateItemModal
					setShow={setShow}
					data={{
						title: headerText,
						subtitle: editorText,
						coverImage:
							images && images.length !== 0
								? images.find((img) => img.id === "cover-image")?.data
								: advocacyPage[0].coverImage,
						sections: sections.map((section) => ({
							title: section.title,
							content: section.content,
							coverImage:
								images.find((img) => img.id === section.id)?.data ||
								section.coverImage,
						})),
					}}
					show={show}
					updateUrl="/advocacy"
					itemId={advocacyPage[0]._id}
					itemType="Advocacy"
				/>
			) : null}
		</div>
	);
}

export default AdminAdvocacyPage;
