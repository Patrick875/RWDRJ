import { ClockLoader } from "react-spinners";
import useFetchData from "../../Hooks/UseFetchData";
import AnimatePage from "../../Shared/AnimatePage";
import parse from "html-react-parser";
import { compaignPage } from "../../Shared/types";

function CampaignAndOrganizing() {
	const { data: compaignPage, loading } =
		useFetchData<compaignPage[]>("/compaign");
	console.log("compaign page", compaignPage);

	return (
		<>
			{loading || !compaignPage ? (
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
						<div className="flex flex-col items-center justify-center w-full h-[60vh] bg-center bg-cover bg-image-whoweare">
							<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto  bg-[rgba(244,244,249,0.70)]">
								<p className="w-5/6 text-5xl font-bold text-center text-black font-lora">
									{compaignPage && compaignPage[0] ? compaignPage[0].title : ""}
								</p>
							</div>
						</div>

						<div className=" bg-primary-orange flex flex-col  justify-center  h-[30vh]">
							<div className="w-5/6 p-3 mx-auto ">
								<p className="p-3 text-2xl text-center font-lora ">
									{compaignPage && compaignPage[0]
										? parse(compaignPage[0].subtitle)
										: ""}
								</p>
							</div>
						</div>
						<div className="bg-blue-900 ">
							<div className="w-5/6 mx-auto ">
								<div className="h-full py-4 text-xl text-justify md:text-start">
									<div className="relative">
										<div className="">
											<p className="p-3 text-justify text-white font-lora">
												{compaignPage &&
												compaignPage[0] &&
												compaignPage[0].content[0].content
													? parse(compaignPage[0].content[0].content)
													: ""}
											</p>
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

export default CampaignAndOrganizing;
