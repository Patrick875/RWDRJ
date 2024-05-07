import useFetchData from "../../Hooks/UseFetchData";
import AnimatePage from "../../Shared/AnimatePage";
import { advocacyPage, sectionSchema } from "../../Shared/types";
import parse from "html-react-parser";
import { ClockLoader } from "react-spinners";

function Advocacy() {
	const { data: advocacy, loading } = useFetchData<advocacyPage[]>("/advocacy");

	return (
		<AnimatePage>
			<div className="">
				{!loading && advocacy && advocacy.length > 0 ? (
					<>
						<div
							style={{
								backgroundImage:
									advocacy && advocacy.length > 0
										? `url(${advocacy[0].coverImage})`
										: "",
							}}
							className="flex flex-col items-center justify-center w-full md:min-h-[60vh] min-h-[40vh] bg-bottom   bg-cover ">
							<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-[rgba(244,244,249,0.70)]">
								<p className="w-5/6 text-2xl font-bold text-center text-black md:text-5xl font-lora">
									{advocacy && advocacy.length > 0 ? advocacy[0].title : ""}
								</p>
							</div>
						</div>

						<div className="p-3 bg-primary-orange min-h-[40vh] flex flex-col justify-center items-center">
							<p className="w-full p-3 text-center md:mx-auto md:w-5/6 md:text-2xl text font-lora ">
								{advocacy && advocacy.length > 0
									? parse(advocacy[0].subtitle)
									: ""}
							</p>
						</div>
						<div className="bg-blue-900 ">
							{advocacy &&
							advocacy.length > 0 &&
							advocacy[0].sections.length > 0
								? advocacy[0].sections.map(
										(sect: sectionSchema, index: number) => {
											return (
												<div
													key={crypto.randomUUID()}
													className={`flex flex-col  gap-1 md:gap-5 ${
														index % 2 === 0
															? " md:flex-row "
															: "md:flex-row-reverse"
													} w-5/6 mx-auto min-h-[40vh]`}>
													<div className="flex flex-col items-center justify-center w-full h-full py-4 md:w-1/2">
														<img
															loading="lazy"
															className="block object-cover w-full rounded-[14px] h-72 "
															src={sect.coverImage}
															alt="advocacy-2"
														/>
													</div>
													<div className="flex flex-col justify-center w-full h-full py-1 text-lg text-center md:py-4 md:text-start md:w-1/2">
														<p className="p-3 px-0 text-lg text-center text-white md:text-2xl md:text-start font-lora">
															{sect.title}
														</p>
														<p className="p-3 px-0 text-sm text-justify text-white md:text-lg">
															{sect && sect.content
																? parse(`${sect.content}`)
																: ""}
														</p>
													</div>
												</div>
											);
										}
								  )
								: null}
						</div>
					</>
				) : (
					<div className="min-h-[100vh] flex flex-col items-center justify-center">
						<ClockLoader
							color="#c29f1d"
							loading={loading}
							className="text-6xl bg-primary-orange"
						/>
					</div>
				)}
			</div>
		</AnimatePage>
	);
}

export default Advocacy;
