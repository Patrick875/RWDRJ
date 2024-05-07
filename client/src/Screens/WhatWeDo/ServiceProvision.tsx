import AnimatePage from "../../Shared/AnimatePage";
import { TbWorld } from "react-icons/tb";
import useFetchData from "../../Hooks/UseFetchData";
import { ClockLoader } from "react-spinners";
import { digitalHealthPage } from "../../Shared/types";

function ServiceProvision() {
	const { data: digitalhealth, loading } =
		useFetchData<digitalHealthPage[]>("/digitalhealth");

	return (
		<>
			{loading || !digitalhealth ? (
				<div className="min-h-[100vh] flex flex-col items-center justify-center">
					<ClockLoader
						color="#c29f1d"
						loading={loading}
						className="text-6xl bg-primary-orange"
					/>
				</div>
			) : (
				<AnimatePage>
					<div className="relative">
						<div className="flex flex-col items-center justify-center w-full min-h-[60vh] bg-cover bg-fixed bg-image-service">
							<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-[rgba(244,244,249,0.70)]">
								<p className="w-5/6 text-3xl font-bold text-center font-lora ">
									{digitalhealth && digitalhealth[0]
										? digitalhealth[0].titles[0]
										: ""}
								</p>
							</div>
						</div>

						<div className=" bg-primary-orange font-lora h-[50vh] flex flex-col justify-center">
							<div className="w-5/6 mx-auto">
								<p className="p-3 text-2xl text-center">
									{digitalhealth && digitalhealth[0]
										? digitalhealth[0].subtitles[0]
										: ""}
								</p>
							</div>
						</div>
						<div className="text-white bg-blue-900">
							<div className="w-5/6 px-4 py-6 mx-auto text-justify">
								<p className="p-3 text-xl ">
									However access to SRHR services, especially safe abortion
									care, is still almost impossible, due to many conscious
									objectors. Our group has formed a network of young women
									physicians practicing in the legally allowed facilities. Young
									women physicians provide confidently safe abortion care and
									related health services as part of their job in the local
									allowed context without stigma. We aim to strengthen the
									network by widening the women's pro-choice human resources to
									continue providing safe abortion care.
								</p>
								<p className="p-3 text-lg ">
									Our group aims to create a virtual safe space for women and
									girls seeking safe abortion care in a legal context. We have
									mobilized digital women experts to take active roles in our
									group. The development of a transformative feminist digital
									technology will provide a virtual safe path to service and
									dignified care for women in Rwanda.
								</p>
							</div>
						</div>

						<div className="md:min-h-[140vh]  relative flex flex-col  bg-image-digitalApp  bg-contain  bg-fixed ">
							<div className="flex flex-col items-center justify-center min-h-[40vh]  w-full mx-auto bg-[rgba(244,244,249,0.70)]">
								<p className="text-2xl font-bold text-center font-lora ">
									{digitalhealth && digitalhealth[0]
										? digitalhealth[0].titles[1]
										: ""}
								</p>
							</div>
							<div className="bg-white min-h-[100vh] flex flex-col">
								<div className="h-[40vh] flex flex-col justify-center">
									<p className="w-5/6 py-4 mx-auto my-3 text-xl text-center font-lora">
										{digitalhealth && digitalhealth[0]
											? digitalhealth[0].subtitles[1]
											: ""}
									</p>
								</div>

								<div className="flex-1 text-white bg-blue-900">
									<div className="flex flex-col w-5/6 p-4 mx-auto mt-1 md:p-8 md:flex-row">
										<div className="flex flex-col flex-1 w-full md:w-1/2">
											<img
												loading="lazy"
												className="block object-contain rounded-[12px] w-full  h-80  "
												src={
													digitalhealth && digitalhealth[0]
														? digitalhealth[0].section.coverImage
														: ""
												}
												alt={"safe-abortion-app"}
											/>
										</div>
										<div className="flex-1 w-full my-8 text-center md:my-0 md:w-1/2 md:text-start md:ps-6">
											<p className="my-8 text-xl font-bold my font-lora">
												{digitalhealth && digitalhealth[0]
													? digitalhealth[0].section.title
													: ""}
											</p>
											<p className="my-2 text-lg text-justify ">
												{digitalhealth && digitalhealth[0]
													? digitalhealth[0].section.content[0]
													: ""}
											</p>
											<div className="flex w-full my-3">
												<a
													className="flex items-center justify-center w-full gap-4 py-2 text-lg font-bold text-center text-white transition-all ease-in bg-primary-orange md:w-1/2 delay-50 hover:bg-white hover:text-primary-orange "
													target="blank"
													href={digitalhealth[0].section.link}>
													<TbWorld className="w-6 h-6" />
													{digitalhealth && digitalhealth[0]
														? digitalhealth[0].section.linkText
														: ""}
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</AnimatePage>
			)}
		</>
	);
}

export default ServiceProvision;
