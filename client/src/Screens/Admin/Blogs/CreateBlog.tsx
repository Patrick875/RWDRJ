import React, { useState } from "react";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-resize-module/dist/resize.css";
import instance from "../../../API";
import { BlogPost } from "../../../Shared/types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import toast from "react-hot-toast";

// const modules = {
// 	toolbar: {
// 		container: [
// 			[{ size: ["small", false, "large", "huge"] }],
// 			["bold", "italic", "underline", "strike"],
// 			["blockquote", "code-block"],
// 			[{ list: "ordered" }, { list: "bullet" }],
// 			[{ script: "sub" }, { script: "super" }],
// 			[{ indent: "-1" }, { indent: "+1" }],
// 			[{ direction: "rtl" }],
// 			[{ align: [] }],
// 			["link", "image"],
// 			["clean"],
// 		],
// 	},
// 	resizing: {
// 		modules: ["Resize", "DisplaySize"],
// 	},
// };

const CreateBlog: React.FC = () => {
	const [title, setTitle] = useState<string>("");
	// const [content, setContent] = useState<string>("");
	const [coverImage, setCoverImage] = useState<string>("");
	// const quillRef = useRef<ReactQuill>(null);

	const [editorText, setEditorText] = useState("");

	const handleEditorChange = (_event: any, editor: any) => {
		const data = editor.getData();
		setEditorText(data);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
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
		const blogPost: BlogPost = {
			title,
			content: editorText,
			coverImage,
		};

		console.log("blogPost", blogPost);

		await instance
			.post("/blogs", blogPost)
			.then(() => {
				toast.success("Success !!!");
			})
			.catch((err) => {
				toast.error(err.code);
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
			<CKEditor editor={ClassicEditor} onChange={handleEditorChange} />

			<button
				onClick={handleSubmit}
				className="px-4 py-2 text-sm font-bold text-white rounded bg-emerald-700 hover:bg-emerald-900">
				Submit
			</button>
		</div>
	);
};

export default CreateBlog;
