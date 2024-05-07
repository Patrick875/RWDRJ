import { useLocation, useNavigate } from "react-router-dom";
import { BlogPost } from "./types";

interface Props {
	blog: BlogPost;
}

function BlogCard({ blog }: Props) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const location = pathname.split("");

	const detailsLinks =
		location.length === 1 ? `news/blogs/${blog.refId}` : `blogs/${blog.refId}`;
	return (
		<div
			className="w-full bg-white rounded-[8px] hover group cursor-pointer"
			onClick={() => {
				navigate(`${detailsLinks}`);
			}}>
			<div className="relative flex items-center justify-center h-32 overflow-hidden ">
				<img
					src={blog.coverImage}
					className="absolute block object-cover w-full h-full my-2 transition-all ease-in delay-75 group-hover:scale-105 "
				/>
			</div>
			<p className="px-2 py-1 text-xl font-bold capitalize">{blog.title}</p>
			{/* {<p className="px-2 py-1 text-lg capitalize">{content}</p>} */}

			<div className="px-2 py-2 ">
				<p className="text-sm font-bold">RWDRJ</p>
				<p className="text-xs ">
					{blog.datePosted
						? new Date(blog.datePosted).toLocaleDateString("fr-FR")
						: null}
				</p>
			</div>
		</div>
	);
}

export default BlogCard;
