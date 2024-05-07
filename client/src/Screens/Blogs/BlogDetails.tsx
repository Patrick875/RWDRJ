import { useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { BlogPost } from "../../Shared/types";
import useFetchData from "../../Hooks/UseFetchData";
import { formatPostedDate, frontendUrl } from "../../constants";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from "react-share";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
// import { SiChainlink } from "react-icons/si";

function BlogDetails() {
	const { refId } = useParams();
	const { pathname } = useLocation();
	const { data: blog, loading } = useFetchData<BlogPost>(`/blogs/${refId}`);

	return (
		<div>
			{loading && <p>Loading ...</p>}
			{!loading && blog && (
				<div>
					<div
						className="w-full min-h-[60vh] bg-center flex flex-col bg-cover rounded-[8px]"
						style={{ backgroundImage: `url(${blog.coverImage})` }}>
						<div className="bg-[rgb(0,0,0,0.6)] flex-1 flex justify-center items-center">
							<div className="w-5/6 mx-auto text-white">
								<p className="w-full p-2 text-3xl text-center bg-transparent font-lora focus:border-blue-500 ">
									{blog.title}
								</p>
								{blog.datePosted && (
									<p className="py-2 text-center">
										Posted on {formatPostedDate(blog.datePosted)}{" "}
									</p>
								)}
							</div>
						</div>
					</div>

					{blog && (
						<div>
							<div className="w-5/6 py-4 mx-auto text-justify md:py-3 ">
								{parse(blog.content)}
								<p className="pt-3 text-lg font-bold">Share on </p>
							</div>
							<div className="flex  justify-center sm:justify-stretch w-5/6 gap-4 pt-2 mx-auto mb-3 text-center md:py-3 md:text-start">
								<FacebookShareButton url={`${frontendUrl}${pathname}`}>
									<FaFacebook className="text-3xl text-sky-700 " />
								</FacebookShareButton>
								<LinkedinShareButton url={`${frontendUrl}${pathname}`}>
									<FaLinkedinIn className="text-3xl text-sky-700 " />
								</LinkedinShareButton>
								<TwitterShareButton url={`${frontendUrl}${pathname}`}>
									<FaSquareXTwitter className="text-3xl " />
								</TwitterShareButton>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default BlogDetails;
