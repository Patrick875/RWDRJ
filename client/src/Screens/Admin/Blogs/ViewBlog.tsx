import { useParams } from "react-router-dom";
import useFetchData from "../../../Hooks/UseFetchData";
import parse from "html-react-parser";
// import ImageResize from "quill-image-resize-module-react";
import { useEffect, useState } from "react";
import instance from "../../../API";
import { BlogPost } from "../../../Shared/types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import toast from "react-hot-toast";

// Quill.register("modules/imageResize", ImageResize);

function ViewBlog() {
	const { refId } = useParams();
	const { data: blog, loading } = useFetchData<BlogPost>(`/blogs/${refId}`);
	const [title, setTitle] = useState<string>("");
	const [coverImage, setCoverImage] = useState<string>("");
	const [localCoverImage, setLocalCoverImage] = useState<string>("");

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const [editorContent, setEditorContent] = useState("");

	// Function to handle editor content changes
	const handleEditorChange = (_event: any, editor: any) => {
		const data = editor.getData();
		setEditorContent(data);
	};

	const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setCoverImage(reader.result as string);
				setLocalCoverImage(URL.createObjectURL(file));
			};
			reader.readAsDataURL(file);
		}
	};

	const loggedIn: boolean = true;

	const deleteBlog = async () => {
		await instance
			.delete(`/blogs/${refId}`)
			.then(() => {
				toast.success("Blog deleted!!!");
			})
			.catch(() => {
				toast.error("Something went wrong!!!");
			});
	};
	const updateBlog = async () => {
		const blogPost: BlogPost = {
			content: editorContent,
			title,
			coverImage,
		};
		await instance
			.patch(`/blogs/${refId}`, blogPost)
			.then(() => {
				toast.success("Blog updated !!!");
			})
			.catch((err) => {
				toast.error(err.code);
			});
		console.log("blog... Post", blogPost);
	};

	useEffect(() => {
		if (blog) {
			setTitle(blog.title);
			setCoverImage(blog.coverImage);
			setLocalCoverImage(blog.coverImage);
		}
	}, [blog]);

	return (
		<div>
			{loading && <p>Loading ...</p>}
			{!loading && blog && (
				<div>
					<div
						className="w-full h-48 bg-center bg-cover rounded-[8px]"
						style={{ backgroundImage: `url(${localCoverImage})` }}>
						<div className="bg-[rgb(0,0,0,0.6)] h-48 flex justify-center items-center">
							<div>
								<input
									onChange={handleTitleChange}
									className="w-full p-2 text-center text-white bg-transparent font-hanuman focus:border-blue-500 "
									defaultValue={blog.title}
									value={title}
								/>
								<div>
									<input
										type="file"
										accept="image/*"
										onChange={handleCoverImageChange}
										className="hidden mb-4"
										id="coverImageInput"
									/>
									<label
										htmlFor="coverImageInput"
										className="block  p-2 mb-4 rounded-[4px] text-xs text-center text-white cursor-pointer bg-sky-900">
										Update Cover Image
									</label>
								</div>
								<button
									type="button"
									onClick={deleteBlog}
									className="w-full py-2 text-xs text-white bg-pink-800">
									Delete Blog Post
								</button>
							</div>
						</div>
					</div>
					{!loggedIn && parse(blog.content)}
					{loggedIn && (
						<div>
							<CKEditor
								editor={ClassicEditor}
								data={blog.content}
								onReady={(editor) => {
									console.log("Editor is ready to use!", editor);
								}}
								onChange={handleEditorChange}
							/>

							<button
								onClick={updateBlog}
								className="text-white bg-emerald-950 font-bold p-1 rounded-[6px]">
								Save
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ViewBlog;
