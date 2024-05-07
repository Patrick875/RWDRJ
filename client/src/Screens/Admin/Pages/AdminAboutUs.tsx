// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import useFetchData from "../../../Hooks/UseFetchData";
// import { ChangeEvent, useEffect } from "react";
// import {
// 	Statistic,
// 	aboutUsPage,
// 	heroSectionSchema,
// 	img,
// 	section,
// 	sectionSchema,
// } from "../../../Shared/types";
// import { IoReturnUpBackOutline } from "react-icons/io5";
// import BackButton from "../../../Shared/BackButton";
// import { fileToDataURL } from "../../../constants";
// import UpdateItemModal from "../../../Shared/UpdateItemModal";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Link } from "react-router-dom";

// interface editableSection extends sectionSchema {
// 	id: string;
// }
// interface editableImage extends img {
// 	id: string;
// }

// interface editableStatistic extends Statistic {
// 	id: string;
// }

// interface whowearesection {
// 	title: string;
// 	link: string;
// 	linkText: string;
// 	coverImage: string;
// 	content: string;
// }

// function AdminAboutUs() {
// 	const { data: aboutusPage } = useFetchData<aboutUsPage[]>("/aboutus");
// 	const { control } = useForm();
// 	const [whoWeAreSection, setWhoWeAreSection] = useState<whowearesection>();
// 	const [whoWeAreTitle, setWhoWeAreTitle] = useState<string>("");
// 	const [heroSection, setHeroSection] = useState<heroSectionSchema>();
// 	const [whatWeDoTitle, setWhatWeDoTitle] = useState<string>();
// 	const [whatWeDoSections, setWhatWeDoSections] = useState<editableSection[]>(
// 		[]
// 	);
// 	const [whatWeDoStatistics, setWhatWeDoStatistics] = useState<
// 		editableStatistic[]
// 	>([]);
// 	const [show, setShow] = useState<boolean>(false);
// 	const [images, setImages] = useState<editableImage[]>([]);
// 	const [sliderImages, setSliderImages] = useState<editableImage[]>([]);
// 	const [whoweareimage, setWhoweareimage] = useState<string>("");
// 	const [headerText, setHeaderText] = useState<string>("");
// 	const [editorText, setEditorText] = useState("");
// 	const [sections, setSections] = useState<editableSection[]>([]);

// 	const handleStats = (e: ChangeEvent<HTMLInputElement>, id: string) => {
// 		setWhatWeDoStatistics(
// 			whatWeDoStatistics.map((stat) => {
// 				const { name, value } = e.target;
// 				if (name === "andMore") {
// 					const newValue = value === "true" ? true : false;
// 					return {
// 						...stat,
// 						[name]: newValue,
// 					};
// 				} else {
// 					return stat.id === id ? { ...stat, [name]: value } : stat;
// 				}
// 			})
// 		);
// 	};

// 	const handlesSectionTitleChange = (
// 		e: ChangeEvent<HTMLInputElement>,
// 		id: string | undefined,
// 		partId: string
// 	) => {
// 		if (partId === "whatwedo") {
// 			setWhatWeDoTitle(e.target.value);
// 		} else if (partId === "whatwedosection") {
// 			const updatedWhatWeDoSections = whatWeDoSections.map(
// 				(sect: editableSection) =>
// 					sect.id === id ? { ...sect, title: e.target.value } : sect
// 			);

// 			setWhatWeDoSections(updatedWhatWeDoSections);
// 		}
// 	};
// 	const handleFileChange = async (
// 		e: ChangeEvent<HTMLInputElement>,
// 		id: string,
// 		partId: string
// 	) => {
// 		const files = e.target.files;
// 		if (!files || files.length === 0) return;

// 		const imagesArray = await Promise.all(
// 			Array.from(files).map(async (file) => {
// 				const dataUrl = await fileToDataURL(file);
// 				return { url: URL.createObjectURL(file), data: dataUrl, id };
// 			})
// 		);

// 		switch (partId) {
// 			case "slider":
// 				setSliderImages((prevImages) => {
// 					const updatedImages = [...prevImages];
// 					const existingImageIndex = updatedImages.findIndex(
// 						(img) => img.id === id
// 					);
// 					if (existingImageIndex !== -1) {
// 						updatedImages.splice(
// 							existingImageIndex,
// 							1,
// 							...imagesArray.filter((image) => image.id === id)
// 						);
// 					} else {
// 						updatedImages.push(...imagesArray);
// 					}
// 					return updatedImages;
// 				});
// 				setImages([]);
// 				break;
// 			case "whoweare":
// 				setWhoweareimage(imagesArray[0].data);
// 				setImages([]);
// 				break;
// 			default:
// 				setImages((prevImages) => {
// 					const updatedImages = [...prevImages];
// 					const existingImageIndex = updatedImages.findIndex(
// 						(img) => img.id === id
// 					);
// 					if (existingImageIndex !== -1) {
// 						updatedImages.splice(
// 							existingImageIndex,
// 							1,
// 							...imagesArray.filter((image) => image.id === id)
// 						);
// 					} else {
// 						updatedImages.push(...imagesArray);
// 					}
// 					return updatedImages;
// 				});
// 		}
// 	};

// 	// Modify the onChange event handler for section content
// 	const handleSectionContentChange = (
// 		content: string,
// 		sectionId: string | undefined,
// 		partId: string
// 	) => {
// 		if (partId === "whoweare") {
// 			setWhoWeAreSection({ ...whoWeAreSection, content: content });
// 		} else if (partId === "whatwedo") {
// 			const updatedSections = whatWeDoSections.map((sect: editableSection) =>
// 				sect.id === sectionId ? { ...sect, content: content } : sect
// 			);
// 			setWhatWeDoSections(updatedSections);
// 		}

// 		const updatedSections = sections.map((sect: editableSection) =>
// 			sect.id === sectionId ? { ...sect, content: content } : sect
// 		);
// 		setSections(updatedSections);
// 	};

// 	const resetImage = (id: string, partId: string) => {
// 		if (partId === "slider") {
// 			const newImages: editableImage[] = sliderImages.filter(
// 				(img) => img.id !== id
// 			);
// 			setSliderImages([...newImages]);
// 		} else {
// 			const newImages: editableImage[] = images.filter((img) => img.id !== id);
// 			setImages([...newImages]);
// 		}
// 	};

// 	useEffect(() => {
// 		if (aboutusPage && aboutusPage.length !== 0) {
// 			setHeroSection({
// 				...aboutusPage[0].herosection,
// 				sliderImages: aboutusPage[0].herosection.sliderImages.map(
// 					(img: string, index: number) => ({ id: index.toString(), url: img })
// 				),
// 			});

// 			setWhoWeAreSection(aboutusPage[0].whoWeAreSection);
// 			setWhoWeAreTitle(aboutusPage[0].whoWeAreSection.title);
// 			setWhatWeDoTitle(aboutusPage[0].whatWeDoSection.title);
// 			setWhatWeDoSections(
// 				aboutusPage[0].whatWeDoSection.sections.map(
// 					(sect: section, index: number) => ({
// 						...sect,
// 						content: `<p>${sect.content[0]}</p>`,
// 						id: index.toString(),
// 					})
// 				)
// 			);
// 			setWhatWeDoStatistics(
// 				aboutusPage[0].statisticSection.statiticGroups.map(
// 					(stat: Statistic, index: number) => ({
// 						...stat,
// 						id: index.toString(),
// 					})
// 				)
// 			);
// 		}
// 	}, [aboutusPage]);

// 	return (
// 		<div>
// 			<BackButton />
// 			<div className="w-full ">
// 				<div className="w-full h-full p-3 bg-white ">
// 					<p className="text-2xl font-semibold"> Hero Section </p>
// 					{/* Header Image */}
// 					<div className="w-full h-[50vh]">
// 						<p>
// 							For updating the header and subheader text in the hero section
// 							please go to{" "}
// 							<Link
// 								className="font-semibold text-blue-800"
// 								to="/admin/dashboard/pages/generalinfo">
// 								General info page
// 							</Link>{" "}
// 						</p>
// 						<label className="block my-2 text-lg font-semibold text-gray-700 ">
// 							Slider Images
// 						</label>
// 						<p className="mb-3 text-xs">Hover to change the image</p>
// 						<div className="grid w-full grid-cols-3 gap-3">
// 							{heroSection &&
// 								heroSection.sliderImages &&
// 								heroSection.sliderImages.map((sliderImage) => (
// 									<div className="relative group" key={crypto.randomUUID()}>
// 										<div className="absolute z-10 hidden w-full h-full transition-all ease-in delay-700 cursor-pointer group-hover:flex bg-page-cover">
// 											<div className="flex flex-col items-center justify-center w-full gap-3">
// 												<Controller
// 													name={`${sliderImage.id}`}
// 													control={control}
// 													defaultValue={null}
// 													render={({ field }) => (
// 														<input
// 															type="file"
// 															id={`${sliderImage.id}`}
// 															accept="image/*"
// 															onChange={(e) => {
// 																field.onChange(e);
// 																handleFileChange(
// 																	e,
// 																	`${sliderImage.id}`,
// 																	"slider"
// 																);
// 															}}
// 															style={{ display: "none" }}
// 														/>
// 													)}
// 												/>
// 												<label
// 													htmlFor={`${sliderImage.id}`}
// 													className="block  text-center  py-1 rounded-[4px] bg-white w-1/2"
// 													style={{ cursor: "pointer" }}>
// 													Change Image{" "}
// 												</label>
// 												{sliderImages &&
// 													sliderImages.length !== 0 &&
// 													sliderImages.some(
// 														(img) => img.id === `${sliderImage.id}`
// 													) && (
// 														<button
// 															type="button"
// 															onClick={() =>
// 																resetImage(`${sliderImage.id}`, "slider")
// 															}
// 															className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/2">
// 															<IoReturnUpBackOutline />
// 															Reset Image
// 														</button>
// 													)}
// 											</div>
// 										</div>
// 										{sliderImages &&
// 										sliderImages.length !== 0 &&
// 										sliderImages.some((img) => img.id === sliderImage.id) ? (
// 											<img
// 												className="block object-cover  h-[30vh] w-full "
// 												src={
// 													sliderImages.find(
// 														(img) => img.id === `${sliderImage.id}`
// 													)?.data
// 												}
// 											/>
// 										) : (
// 											<img
// 												className="block object-cover h-[30vh]  w-full "
// 												src={sliderImage.url}
// 											/>
// 										)}
// 									</div>
// 								))}
// 						</div>
// 					</div>

// 					<p className="text-2xl font-semibold"> Who we are </p>
// 					{/* Sections */}
// 					{whoWeAreSection && (
// 						<div className="flex gap-4 my-3">
// 							<div className="w-1/2">
// 								<div className="relative">
// 									<div className="absolute flex  h-[30vh] w-full bg-page-cover">
// 										<div className="flex flex-col items-center justify-center w-full gap-3">
// 											<Controller
// 												name="whoweare"
// 												control={control}
// 												defaultValue={null}
// 												render={({ field }) => (
// 													<input
// 														type="file"
// 														id="whoweare"
// 														accept="image/*"
// 														onChange={(e) => {
// 															console.log("here-hapa");

// 															field.onChange(e);
// 															handleFileChange(e, "whoweare", "whoweare");
// 														}}
// 														style={{ display: "none" }}
// 													/>
// 												)}
// 											/>
// 											<label
// 												htmlFor="whoweare"
// 												className="block  text-center  py-1 rounded-[4px] bg-white w-1/3"
// 												style={{ cursor: "pointer" }}>
// 												Change Image{" "}
// 											</label>
// 											{whoweareimage && whoweareimage !== "" && (
// 												<button
// 													type="button"
// 													onClick={() => setWhoweareimage("")}
// 													className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/4">
// 													<IoReturnUpBackOutline />
// 													Reset Image
// 												</button>
// 											)}
// 										</div>
// 									</div>

// 									{whoweareimage && whoweareimage !== "" ? (
// 										<img
// 											className="block h-[30vh]  object-cover w-full  "
// 											src={whoweareimage}
// 										/>
// 									) : (
// 										<img
// 											className="block h-[30vh]  object-cover w-full  "
// 											src={whoWeAreSection.coverImage}
// 										/>
// 									)}
// 								</div>
// 							</div>
// 							<div className="w-1/2 ">
// 								{whoWeAreSection.content &&
// 								whoWeAreSection.content.length !== 0 ? (
// 									<div className="h-full">
// 										<div className="py-2 ">
// 											<label className="block font-medium text-gray-700 ">
// 												Title
// 											</label>
// 											<input
// 												defaultValue={whoWeAreTitle}
// 												onChange={(e) =>
// 													handlesSectionTitleChange(e, undefined, "whowere")
// 												}
// 												type="text"
// 												className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 											/>
// 										</div>
// 										<div>
// 											<ReactQuill
// 												theme="snow"
// 												className="h-[16vh]"
// 												onChange={(content: string) =>
// 													handleSectionContentChange(
// 														content,
// 														undefined,
// 														"whoweare"
// 													)
// 												} // Use handleSectionContentChange
// 												value={`<p>${whoWeAreSection.content}</p>`}
// 											/>
// 										</div>
// 									</div>
// 								) : (
// 									<div>{whoWeAreSection.content}</div>
// 								)}
// 							</div>
// 						</div>
// 					)}

// 					<p className="text-2xl font-semibold"> What we do </p>
// 					<div className="py-2 ">
// 						<label className="block font-medium text-gray-700 ">Title</label>
// 						<input
// 							defaultValue={whatWeDoTitle}
// 							onChange={(e) =>
// 								handlesSectionTitleChange(e, undefined, "whatwedo")
// 							}
// 							type="text"
// 							className="w-1/2 px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 						/>
// 					</div>
// 					{/* Sections */}
// 					{whatWeDoSections &&
// 						whatWeDoSections.map((section: editableSection, index: number) => (
// 							<div className="flex gap-4 my-3" key={crypto.randomUUID()}>
// 								<div className="w-1/2">
// 									<div className="relative">
// 										<div className="absolute flex  h-[30vh] w-full bg-page-cover">
// 											<div className="flex flex-col items-center justify-center w-full gap-3">
// 												<Controller
// 													name={`${index}`}
// 													control={control}
// 													defaultValue={null}
// 													render={({ field }) => (
// 														<input
// 															type="file"
// 															id={`${index}`}
// 															accept="image/*"
// 															onChange={(e) => {
// 																field.onChange(e);
// 																handleFileChange(e, `${index}`, "whatwedo");
// 															}}
// 															style={{ display: "none" }}
// 														/>
// 													)}
// 												/>
// 												<label
// 													htmlFor={`${index}`}
// 													className="block  text-center  py-1 rounded-[4px] bg-white w-1/3"
// 													style={{ cursor: "pointer" }}>
// 													Change Image{" "}
// 												</label>
// 												{images &&
// 													images.length !== 0 &&
// 													images.some((img) => img.id === section.id) && (
// 														<button
// 															type="button"
// 															onClick={() => {
// 																console.log("reset");
// 															}}
// 															className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/3">
// 															<IoReturnUpBackOutline />
// 															Reset Image
// 														</button>
// 													)}
// 											</div>
// 										</div>

// 										{images && images.length !== 0 ? (
// 											<img
// 												className="block h-[30vh]  object-cover w-full  "
// 												src={
// 													images.find((img) => img.id === section.id)?.url ||
// 													section.coverImage
// 												}
// 											/>
// 										) : (
// 											<img
// 												className="block h-[30vh]  object-cover w-full  "
// 												src={section.coverImage}
// 											/>
// 										)}
// 									</div>
// 								</div>
// 								<div className="w-1/2">
// 									{section.content && section.content.length !== 0 ? (
// 										<div className="h-full">
// 											<div className="py-1 ">
// 												<label className="block font-medium text-gray-700 ">
// 													Title
// 												</label>
// 												<input
// 													defaultValue={section.title}
// 													onChange={(e) =>
// 														handlesSectionTitleChange(
// 															e,
// 															section.id,
// 															"whatwedosections"
// 														)
// 													}
// 													type="text"
// 													className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 												/>
// 											</div>
// 											<ReactQuill
// 												theme="snow"
// 												className="h-[14vh]"
// 												onChange={(content: string) =>
// 													handleSectionContentChange(
// 														content,
// 														section.id,
// 														"whatwedo"
// 													)
// 												} // Use handleSectionContentChange
// 												value={section.content}
// 											/>
// 										</div>
// 									) : (
// 										<div>{section.content}</div>
// 									)}
// 								</div>
// 							</div>
// 						))}
// 					<p className="text-2xl font-semibold"> Statistics </p>
// 					{/* Statistics*/}
// 					<div className="flex gap-4">
// 						{whatWeDoStatistics &&
// 							whatWeDoStatistics.map((stat: editableStatistic) => (
// 								<div className="w-1/2 text-sm" key={crypto.randomUUID()}>
// 									<div className="py-2 ">
// 										<label className="block font-medium text-gray-700 ">
// 											Title
// 										</label>
// 										<input
// 											name="title"
// 											defaultValue={stat.title}
// 											onChange={(e) => handleStats(e, stat.id)}
// 											type="text"
// 											className="w-full px-3 py-1 text-sm border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 										/>
// 									</div>
// 									<div className="text-sm ">
// 										<div className="py-2 ">
// 											<label className="block font-medium text-gray-700 ">
// 												Numbers
// 											</label>
// 											<input
// 												name="currentNumber"
// 												defaultValue={stat.currentNumber}
// 												onChange={(e) => handleStats(e, stat.id)}
// 												type="text"
// 												className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
// 											/>
// 										</div>
// 										<div className="flex items-center gap-3 py-2">
// 											<label className="block font-medium text-gray-700 ">
// 												Show the plus icon
// 											</label>
// 											<select name="andMore" className="py-1 text-xs ">
// 												<option value="false">No</option>
// 												<option selected={stat.andMore} value="true">
// 													Yes
// 												</option>
// 											</select>
// 										</div>
// 									</div>
// 								</div>
// 							))}
// 					</div>

// 					<button
// 						onClick={() => {
// 							setShow(true);
// 						}}
// 						className="px-8 mt-4 py-2 rounded-[4px] bg-teal-800 text-white">
// 						Update{" "}
// 					</button>
// 				</div>
// 			</div>
// 			{aboutusPage && aboutusPage.length !== 0 ? (
// 				<UpdateItemModal
// 					setShow={setShow}
// 					data={{
// 						title: headerText,
// 						subtitle: editorText,
// 						coverImage:
// 							images && images.length !== 0
// 								? images.find((img) => img.id === "cover-image")?.data
// 								: aboutusPage[0].coverImage,
// 						sections: sections.map((section) => ({
// 							content: section.content,
// 							coverImage:
// 								images.find((img) => img.id === section.id)?.data ||
// 								section.coverImage,
// 						})),
// 					}}
// 					show={show}
// 					updateUrl="/digitalhealth"
// 					itemId={aboutusPage[0]._id}
// 					itemType="Digital Health"
// 				/>
// 			) : null}
// 		</div>
// 	);
// }

// export default AdminAboutUs;

// // const handleFileChange = async (
// // 	e: ChangeEvent<HTMLInputElement>,
// // 	id: string,
// // 	partId: string | undefined
// // ) => {
// // 	const files = e.target.files;

// // 	let imagesArray: editableImage[] = [];

// // 	if (files && files.length !== 0) {
// // 		imagesArray = await Promise.all(
// // 			Array.from(files).map(async (file) => {
// // 				const dataUrl: string = await fileToDataURL(file);

// // 				return {
// // 					url: URL.createObjectURL(file),
// // 					data: dataUrl,
// // 					id,
// // 				};
// // 			})
// // 		);

// // 		// Update slider images
// // 		if (partId && partId === "slider") {
// // 			setSliderImages((prevImages) => {
// // 				const updatesImages = [...prevImages];
// // 				const existingImageIndex = updatesImages.findIndex(
// // 					(img) => img.id === id
// // 				);
// // 				if (existingImageIndex !== -1) {
// // 					updatesImages.splice(
// // 						existingImageIndex,
// // 						1,
// // 						...imagesArray.filter((image) => image.id === id)
// // 					);
// // 				} else {
// // 					updatesImages.push(...imagesArray);
// // 				}

// // 				return updatesImages;
// // 			});
// // 			setImages([]);
// // 		}
// // 		// Update who we are image
// // 		else if (partId && partId === "whoweare") {
// // 			setWhoweareimage(imagesArray[0].data);
// // 			setImages([]);
// // 		} else {
// // 			setImages((prevImages) => {
// // 				const updatedImages = [...prevImages];
// // 				const existingImageIndex = updatedImages.findIndex(
// // 					(img) => img.id === id
// // 				);
// // 				if (existingImageIndex !== -1) {
// // 					// Replace the existing images for the specific id
// // 					updatedImages.splice(
// // 						existingImageIndex,
// // 						1,
// // 						...imagesArray.filter((image) => image.id === id)
// // 					);
// // 				} else {
// // 					// Add the new images for the specific id
// // 					updatedImages.push(...imagesArray);
// // 				}
// // 				return updatedImages;
// // 			});
// // 		}
// // 	}
// // };

function AdminAboutUs() {
	return <div>AdminAboutUs</div>;
}

export default AdminAboutUs;
