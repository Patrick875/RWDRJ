import { useParams } from "react-router-dom";
import useFetchData from "../../../Hooks/UseFetchData";
import parse from "html-react-parser";
import ReactQuill from "react-quill";
import { useEffect, useMemo, useRef, useState } from "react";
import instance from "../../../API";
import { EventPost } from "../../../Shared/types";
import { formatDate } from "../../../constants";

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

function ViewEvent() {
	const { refId } = useParams();
	const quillRef = useRef<ReactQuill>(null);
	const { data: event, loading } = useFetchData<EventPost>(`/events/${refId}`);
	const [title, setTitle] = useState<string>("");
	const [dateend, setDateEnd] = useState<string>("");
	const [datestart, setDateStart] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [coverImage, setCoverImage] = useState<string>("");
	const [localCoverImage, setLocalCoverImage] = useState<string>("");

	const lengthChanged = useMemo(() => {
		if (event) {
			const currentEditor = quillRef.current?.getEditor();
			const unprevEditor = currentEditor
				? quillRef.current?.makeUnprivilegedEditor(currentEditor)
				: null;

			if (unprevEditor) {
				if (
					event.description.length < unprevEditor?.getHTML().length ||
					title.length !== event.title.length ||
					localCoverImage !== event.coverImage
				) {
					return true;
				}
			} else {
				return false;
			}
		}
	}, [description, title, localCoverImage]);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
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
				setLocalCoverImage(URL.createObjectURL(file));
			};
			reader.readAsDataURL(file);
		}
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

	const loggedIn: boolean = true;
	const updateEvent = async () => {
		const eventPost: EventPost = {
			description,
			title,
			coverImage,
			dateend,
			datestart,
		};

		await instance
			.patch(`/events/${refId}`, eventPost)
			.then((res) => {
				console.log("res", res);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	useEffect(() => {
		if (event) {
			console.log("event", event);

			setDescription(event.description);
			setTitle(event.title);
			setCoverImage(event.coverImage);
			setLocalCoverImage(event.coverImage);
			setDateEnd(formatDate(event.dateend));
			setDateStart(formatDate(event.datestart));
		}
	}, [event]);

	return (
		<div>
			{loading && <p>Loading ...</p>}
			{!loading && event && (
				<div>
					<div
						className="w-full h-48 bg-center bg-cover rounded-[8px]"
						style={{ backgroundImage: `url(${localCoverImage})` }}>
						<div className="bg-[rgb(0,0,0,0.6)] h-48 flex justify-center items-center">
							<div>
								<input
									onChange={handleTitleChange}
									className="w-full p-2 text-center text-white bg-transparent font-hanuman focus:border-blue-500 "
									defaultValue={event.title}
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
							</div>
						</div>
					</div>
					{!loggedIn && parse(event.description)}
					{loggedIn && (
						<div>
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
								defaultValue={event.description}
								onChange={handleContentChange}
								placeholder="Write your event post description here..."
								className="mb-4"
								modules={modules}
							/>
							{lengthChanged && (
								<button
									onClick={updateEvent}
									className="text-white bg-emerald-950 font-bold p-1 rounded-[6px]">
									Save
								</button>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ViewEvent;
