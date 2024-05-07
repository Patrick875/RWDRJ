import { motion } from "framer-motion";
import AnimatePage from "../../Shared/AnimatePage";
import useFetchData from "../../Hooks/UseFetchData";
import { sectionSchema, trainingPage } from "../../Shared/types";
import parse from "html-react-parser";
import { ClockLoader } from "react-spinners";

function Training() {
	const { data: trainingPage, loading } =
		useFetchData<trainingPage[]>("/training");

	return (
		<>
			{loading || !trainingPage ? (
				<div className="min-h-[100vh] flex flex-col items-center justify-center">
					<ClockLoader
						color="#c29f1d"
						loading={loading}
						className="text-6xl bg-primary-orange"
					/>
				</div>
			) : (
				<AnimatePage>
					<div className="">
						<div
							style={{
								backgroundImage: `url(${
									trainingPage && trainingPage[0]
										? trainingPage[0].coverImage
										: ""
								})`,
							}}
							className="flex flex-col items-center justify-center w-full h-[60vh] bg-center bg-cover ">
							<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-[rgba(244,244,249,0.70)]">
								<p className="w-5/6 text-5xl font-bold text-center font-lora ">
									{trainingPage && trainingPage[0] && trainingPage[0].title}
								</p>
							</div>
						</div>

						<div className="">
							<div className="bg-primary-orange">
								<div className="w-5/6 p-3 mx-auto h-[50vh] flex flex-col justify-center">
									<p className="p-3 text-2xl text-center font-lora ">
										{trainingPage &&
											trainingPage[0] &&
											trainingPage[0].subtitle}
									</p>
								</div>
							</div>

							<div className="w-5/6 mx-auto">
								<div>
									{trainingPage && trainingPage[0]
										? trainingPage[0].sections.map(
												(sect: sectionSchema, i: number) => (
													<motion.div
														initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
														animate={{ opacity: 1, x: 0 }}
														viewport={{ amount: 0.7, once: true }}
														transition={{ duration: 0.8, delay: i * 0.4 }}
														key={crypto.randomUUID()}
														className={`flex flex-col md:flex-row flex-1 mt-1 p-8 bg-white ${
															i % 2 !== 0 && " md:flex-row-reverse "
														} `}>
														<div className="flex flex-col w-full md:w-1/2">
															<img
																loading="lazy"
																className="block object-cover object-top rounded-[12px] w-full  h-72  "
																src={sect.coverImage}
																alt={"sawa"}
															/>
														</div>
														<div className="flex flex-col w-full pt-0 md:px-6 md:w-1/2">
															<div className="flex-1">
																<p className="my-2 text-xl font-bold text-center font-lora md:mt-0 md:text-start text-bold text-md ">
																	{`0${i + 1}`}{" "}
																</p>
																<p className="my-4 mb-4 text-xl font-bold text-center font-lora text-primary-orange md:mt-0 md:text-start text-bold text-md ">
																	{sect.title}
																</p>
																<p className="flex flex-col justify-center text-lg font-normal text-center md:text-justify">
																	{parse(`<p>${sect.content}</p>`)}
																</p>
															</div>
														</div>
													</motion.div>
												)
										  )
										: null}
								</div>
							</div>
						</div>
					</div>
				</AnimatePage>
			)}
		</>
	);
}

export default Training;
