import { Controller, useForm } from "react-hook-form";
import useFetchData from "../../../Hooks/UseFetchData";
import { ChangeEvent, useEffect, useState } from "react";
import { contactusPage, img } from "../../../Shared/types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoReturnUpBackOutline } from "react-icons/io5";
import BackButton from "../../../Shared/BackButton";
import { fileToDataURL } from "../../../constants";
import UpdateItemModal from "../../../Shared/UpdateItemModal";

function AdminContactUs() {
	const { data: contactUsPage } = useFetchData<contactusPage[]>("/contactus");
	const { control } = useForm();
	const [show, setShow] = useState<boolean>(false);
	const [images, setImages] = useState<img[]>([]);
	const [headerText, setHeaderText] = useState<string>("");
	const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
	const [emails, setEmails] = useState<string[]>([]);
	const [phone1, setPhone1] = useState<string>("");
	const [phone2, setPhone2] = useState<string>("");
	const [email1, setEmail1] = useState<string>("");
	const [email2, setEmail2] = useState<string>("");

	const [mapHeaderText, setMapHeaderText] = useState<string>("");
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

	useEffect(() => {
		if (contactUsPage && contactUsPage.length !== 0) {
			setHeaderText(contactUsPage[0].title);
			setMapHeaderText(contactUsPage[0].mapHeaderText);
			setPhoneNumbers(contactUsPage[0].phoneNumbers);
			setPhone1(contactUsPage[0].phoneNumbers[0]);
			setPhone2(contactUsPage[0].phoneNumbers[1]);
			setEmails(contactUsPage[0].emails);
			setEmail1(contactUsPage[0].emails[0]);
			setEmail2(contactUsPage[0].emails[1]);
		}
	}, [contactUsPage]);

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
										contactUsPage &&
										contactUsPage.length !== 0 &&
										contactUsPage[0].coverImage
											? contactUsPage[0].coverImage
											: ""
									}
								/>
							)}
						</div>
					</div>

					<div className="py-2 mt-2">
						<label className="block my-2 font-medium text-gray-700 ">
							Phone 1
						</label>
						<input
							defaultValue={
								phoneNumbers && phoneNumbers.length !== 0 ? phoneNumbers[0] : ""
							}
							onChange={(e) => setPhone1(e.target.value)}
							type="text"
							className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>
					<div className="py-2 mt-2">
						<label className="block my-2 font-medium text-gray-700 ">
							Phone 2
						</label>
						<input
							defaultValue={
								phoneNumbers && phoneNumbers.length !== 0 ? phoneNumbers[1] : ""
							}
							onChange={(e) => setPhone2(e.target.value)}
							type="text"
							className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>
					<div className="py-2 mt-2">
						<label className="block my-2 font-medium text-gray-700 ">
							Email 1
						</label>
						<input
							defaultValue={emails && emails.length !== 0 ? emails[0] : ""}
							onChange={(e) => setEmail1(() => e.target.value)}
							type="text"
							className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
					</div>
					<div className="py-2 mt-2">
						<label className="block my-2 font-medium text-gray-700 ">
							Email 2
						</label>
						<input
							defaultValue={emails && emails.length !== 0 ? emails[1] : ""}
							onChange={(e) => setEmail2(e.target.value)}
							type="text"
							className="w-full px-3 py-1 border border-gray-500 rounded shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
						/>
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
							Map Header
						</label>
						<CKEditor
							config={editorConfig}
							data={mapHeaderText ? mapHeaderText : ""}
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
							console.log({
								title: headerText,
								mapHeaderText: editorText,
								phoneNumbers: [phone1, phone2],
								emails: [email1, email2],
								coverImage:
									images && images.length !== 0
										? images[0].data
										: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953716/RWDJ-IMAGES/whoweare_a5cyzd.webp",
							});

							setShow(true);
						}}
						className="px-8 mt-4 py-2 rounded-[4px] bg-teal-800 text-white">
						Update{" "}
					</button>
				</div>
			</div>
			{contactUsPage && contactUsPage.length !== 0 ? (
				<UpdateItemModal
					setShow={setShow}
					data={{
						title: headerText,
						mapHeaderText: editorText,
						phoneNumbers: [phone1, phone2],
						emails: [email1, email2],
						coverImage:
							images && images.length !== 0
								? images[0].data
								: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953716/RWDJ-IMAGES/whoweare_a5cyzd.webp",
					}}
					show={show}
					updateUrl="/contactus"
					itemId={contactUsPage[0]._id}
					itemType="Contact Us Page"
				/>
			) : null}
		</div>
	);
}

export default AdminContactUs;
