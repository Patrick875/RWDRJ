import useFetchData from "../../Hooks/UseFetchData";
import BlogCard from "../../Shared/BlogCard";
import { BlogPost } from "../../Shared/types";

function Blogs() {
	const { data: blogs } = useFetchData<BlogPost[]>("/blogs");

	return (
		<div className="w-full">
			{blogs && blogs.length !== 0 ? (
				<div className="grid w-full grid-cols-4 gap-3 ">
					{blogs.map((el: BlogPost) => (
						<BlogCard blog={el} key={el.refId} />
					))}
				</div>
			) : (
				<p className="text-xs">Blogs will be posted here.</p>
			)}
		</div>
	);
}

export default Blogs;
