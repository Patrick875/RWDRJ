import AnimatePage from "../../Shared/AnimatePage";
import { objectives } from "../../constants";

function OurMission() {
	return (
		<AnimatePage>
			<div className="">
				<div className="flex flex-col items-center justify-center w-full h-56 bg-center bg-cover bg-image-whoweare">
					<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-page-cover">
						<p className="w-5/6 text-xl font-bold text-center text-white">
							Our values and Objectives
						</p>
					</div>
				</div>

				<div className="w-5/6 mx-auto ">
					<p className="my-2 text-lg font-extrabold text-center text-sky-900 ">
						Our Mission{" "}
					</p>
					<p className="p-3 text-xs bg-white">
						The ultimate mission is to create and strengthen a feminist network
						of girls and young women to advance bodily autonomy and sexual
						reproductive rights.
					</p>
					<p className="my-2 text-lg font-extrabold text-center text-sky-900 ">
						Our Vision{" "}
					</p>
					<p className="p-3 text-xs bg-white">
						We envision a future where every woman is free to choose, free from
						violence, able to achieve the highest attainable success, protected
						and respected.
					</p>
					<p className="my-2 text-lg font-extrabold text-center text-sky-900 ">
						Our Objectives{" "}
					</p>
					<p className="py-3 text-xs">
						<p className="px-3 bg-white">
							<ul className="p-3 list-disc">
								{objectives.map((item) => (
									<li className="p-2 " key={crypto.randomUUID()}>
										{item}
									</li>
								))}
							</ul>
						</p>
					</p>
				</div>
			</div>
		</AnimatePage>
	);
}

export default OurMission;
