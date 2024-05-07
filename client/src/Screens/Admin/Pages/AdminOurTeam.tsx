import { ChangeEvent, useEffect, useState } from "react";
import useFetchData from "../../../Hooks/UseFetchData";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Controller, useForm } from "react-hook-form";
import { fileToDataURL } from "../../../constants";
import { img, ourTeamPage } from "../../../Shared/types";
import { IoReturnUpBackOutline } from "react-icons/io5";
import BackButton from "../../../Shared/BackButton";
import UpdateItemModal from "../../../Shared/UpdateItemModal";
function AdminOurTeam() {
	const { data: ourTeamPage } = useFetchData<ourTeamPage[]>("/ourteam");

	console.log("our-team-page", ourTeamPage);

	const { control } = useForm();
	const [show, setShow] = useState<boolean>(false);
	const [images, setImages] = useState<img[]>([]);
	const [headerText, setHeaderText] = useState<string>("");
	const [editorText, setEditorText] = useState("");
	const editorConfig = {
		toolbar: {
			items: [
				"bold",
				"italic",
				"underline",
				"|", // Separator
				"bulletedList",
				"numberedList",
				"|", // Separator
				"undo",
				"redo",
			],
		},
		// Other configuration options
	};
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
	const handleEditorChange = (_event: any, editor: any) => {
		const data = editor.getData();
		setEditorText(data);
	};
	const [subHeaderText, setSubHeaderText] = useState<string>("");
	useEffect(() => {
		if (ourTeamPage && ourTeamPage.length !== 0) {
			setHeaderText(ourTeamPage[0].title);
			setSubHeaderText(ourTeamPage[0].subtitle);
		}
	}, [ourTeamPage]);

	return (
		<div>
			<BackButton />
			<div className="w-full ">
				<div className="w-full h-full p-3 bg-white ">
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
													handleFileChange(e);
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
									{images && images.length !== 0 && (
										<button
											type="button"
											onClick={() => {
												setImages([]);
											}}
											className=" flex  gap-3 justify-center items-center  py-1 rounded-[4px] text-white bg-purple-800 w-1/4">
											<IoReturnUpBackOutline />
											Reset Image
										</button>
									)}
								</div>
							</div>
							{images && images.length !== 0 ? (
								<img
									className="block h-[60vh]  object-cover w-full  "
									src={images[0].data}
								/>
							) : (
								<img
									className="block h-[60vh]  object-cover w-full  "
									src={
										ourTeamPage &&
										ourTeamPage.length !== 0 &&
										ourTeamPage[0].coverImage
											? ourTeamPage[0].coverImage
											: ""
									}
								/>
							)}
						</div>
					</div>

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
					<div className="py-2">
						<label className="block my-2 font-medium text-gray-700 ">
							SubHeader
						</label>
						<CKEditor
							config={editorConfig}
							data={subHeaderText}
							editor={ClassicEditor}
							onChange={handleEditorChange}
						/>

						{/* {<input
							defaultValue={SubHeaderText}
							type="text"
							className="px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>} */}
					</div>

					<button
						onClick={() => {
							setShow(true);
						}}
						className="px-8 mt-4 py-2 rounded-[4px] bg-teal-800 text-white">
						Update{" "}
					</button>
				</div>
			</div>
			{ourTeamPage && ourTeamPage.length !== 0 ? (
				<UpdateItemModal
					setShow={setShow}
					data={{
						title: headerText,
						subtitle: editorText,
						coverImage:
							images && images.length !== 0
								? images[0].data
								: ourTeamPage[0].coverImage,
					}}
					show={show}
					updateUrl="/ourteam"
					itemId={ourTeamPage[0]._id}
					itemType="Our Team Page"
				/>
			) : null}
		</div>
	);
}

export default AdminOurTeam;
