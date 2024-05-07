import { HiCalendarDays } from "react-icons/hi2";
import useFetchData from "../../Hooks/UseFetchData";
import { NewsItem } from "../../Shared/types";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";

function News() {
	const { data: news, loading } = useFetchData<NewsItem[]>("/news");
	const navigate = useNavigate();
	// const news: NewsItem[] = [];
	return (
		<div>
			<div className="flex flex-col items-center justify-center w-full min-h-[60vh] bg-center bg-cover bg-image-whoweare">
				<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-[rgba(244,244,249,0.70)]">
					<p className="w-5/6 text-3xl font-bold text-center text-black font-lora">
						News and other updates
					</p>
				</div>
			</div>
			<div className="w-11/12 mx-auto ">
				<div className="min-h-[60vh] mt-10">
					{(news && news.length === 0) ||
						!news ||
						(loading && (
							<div className="min-h-[100vh] flex flex-col items-center justify-center">
								<ClockLoader
									color="#c29f1d"
									loading={loading}
									className="text-6xl bg-primary-orange"
								/>
							</div>
						))}
					{news && news.length !== 0 && (
						<div className="grid h-full ">
							{news.map((blog) =>
								Object.keys(blog).includes("content") ? (
									<div
										className="w-full flex my-2 shadow min-h-[30vh] bg-white rounded-[8px] hover group cursor-pointer"
										onClick={() => {
											navigate(`blogs/${blog.refId}`);
										}}>
										<div className="relative min-h-[30vh] flex items-center justify-center w-1/2  overflow-hidden ">
											<img
												src={blog.coverImage}
												className="absolute block object-cover w-full my-2 transition-all ease-in delay-75 group-hover:scale-105 "
											/>
										</div>
										<div className="w-1/2">
											<p className="px-2 py-1 text-xl font-bold capitalize">
												{blog.title}
											</p>

											<div className="px-2 py-2 ">
												<p className="text-sm font-bold">RWDRJ</p>
												{/* {<p className="text-xs ">
													{blog.datePosted && blog.datePosted
														? new Date(blog.datePosted).toLocaleDateString(
																"fr-FR"
														  )
														: null}
												</p>} */}
											</div>
										</div>
									</div>
								) : (
									<div
										onClick={() => {
											navigate(`news/events/${blog.refId}`);
										}}
										className="w-full bg-white rounded-[8px] cursor-pointer  group">
										<div className="relative flex items-center justify-center h-32 overflow-hidden">
											<img
												src={blog.coverImage}
												className="absolute block object-cover w-full h-full my-2 transition-all ease-in delay-75 group-hover:scale-105 "
											/>
										</div>
										<p className="px-2 py-1 font-bold capitalize ">
											{blog.title}
										</p>

										<div className="px-2 py-2 font-bold">
											<p className="flex items-center gap-2 text-xs ">
												<HiCalendarDays className="text-lg text-gray-500 " />
												{blog.datestart
													? new Date(blog.datestart).toLocaleDateString("fr-FR")
													: null}{" "}
												<span className="font-bold"> - </span>
												{blog.dateend
													? new Date(blog.dateend).toLocaleDateString("fr-FR")
													: null}
											</p>
											<p className="text-sm ">RWDRJ</p>
										</div>
									</div>
								)
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default News;
