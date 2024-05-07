import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import instance from "../../../API";
import { EventPost } from "../../../Shared/types";

const modules = {
	toolbar: {
		container: [
			[{ size: ["small", false, "large", "huge"] }],
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }],
			[{ indent: "-1" }, { indent: "+1" }],
			[{ direction: "rtl" }],
			[{ align: [] }],
			["link"],
			["clean"],
		],
	},
};

const CreateEvent: React.FC = () => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [dateend, setDateEnd] = useState<string>("");
	const [datestart, setDateStart] = useState<string>("");
	const [coverImage, setCoverImage] = useState<string>("");
	const quillRef = useRef<ReactQuill>(null);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("start", e.target.value);

		const startDate = e.target.value;
		setDateStart(startDate);
	};
	const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const endDate = e.target.value;
		setDateEnd(endDate);
	};

	const handleContentChange = (value: string) => {
		setDescription(value);
	};

	const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setCoverImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async () => {
		const eventPost: EventPost = {
			title,
			description,
			coverImage,
			dateend,
			datestart,
		};

		await instance
			.post("/events", eventPost)
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<div className="p-4">
			<input
				type="text"
				placeholder="Enter blog post title"
				value={title}
				onChange={handleTitleChange}
				className="w-full p-2 mb-4 text-xs border border-gray-300 rounded placeholder:text-xs focus:outline-none focus:border-blue-500"
			/>
			<div className="w-full">
				<input
					type="file"
					accept="image/*"
					onChange={handleCoverImageChange}
					className="hidden mb-4"
					id="coverImageInput"
				/>
				<label
					htmlFor="coverImageInput"
					className="block w-1/5 p-2 mb-4 rounded-[4px] text-xs text-white cursor-pointer bg-sky-900">
					Choose Cover Image
				</label>
				{coverImage && (
					<div className="overflow-hidden resize">
						<img
							loading="lazy"
							src={coverImage}
							alt="Cover"
							className="w-24 h-24 max-w-full mb-4"
						/>
					</div>
				)}
			</div>
			<input
				type="datetime-local"
				placeholder="Enter start date"
				value={datestart}
				onChange={handleStartDate}
				className="w-full p-2 mb-4 text-xs border border-gray-300 rounded placeholder:text-xs focus:outline-none focus:border-blue-500"
			/>
			<input
				type="datetime-local"
				placeholder="Enter End date"
				value={dateend}
				onChange={handleEndDate}
				className="w-full p-2 mb-4 text-xs border border-gray-300 rounded placeholder:text-xs focus:outline-none focus:border-blue-500"
			/>
			<ReactQuill
				ref={quillRef}
				theme="snow"
				value={description}
				onChange={handleContentChange}
				placeholder="Write your blog post content here..."
				className="mb-4"
				modules={modules}
			/>

			<button
				onClick={handleSubmit}
				className="px-4 py-2 text-sm font-bold text-white rounded bg-emerald-700 hover:bg-emerald-900">
				Submit
			</button>
		</div>
	);
};

export default CreateEvent;
