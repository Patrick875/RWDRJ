import useFetchData from "../../Hooks/UseFetchData";
import AnimatePage from "../../Shared/AnimatePage";
import { member, ourTeamPage } from "../../Shared/types";
import { motion } from "framer-motion";
import parse from "html-react-parser";

function OurTeam() {
	const { data: ourteam } = useFetchData<ourTeamPage[]>("/ourteam");
	const { data: teamMembers } = useFetchData<member[]>("/teammembers");

	return (
		<AnimatePage>
			<div className="flex flex-col items-center h-[60vh] justify-center w-full  bg-top bg-cover bg-image-our-team">
				<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-page-cover">
					<p className="w-5/6 mt-24 text-3xl font-bold text-center text-white font-lora">
						{ourteam && ourteam.length !== 0 && ourteam[0].title}
					</p>
				</div>
			</div>
			<div className=" bg-blue-900 text-white font-lora h-[20vh] flex flex-col justify-center">
				<div className="w-5/6 mx-auto">
					<p className="p-3 text-2xl text-center ">
						{ourteam && ourteam.length !== 0 && parse(ourteam[0].subtitle)}
					</p>
				</div>
			</div>
			<motion.div
				id="ourteam"
				viewport={{ once: false, amount: 0.3 }}
				initial={{ opacity: 0.2 }}
				animate={{ opacity: 1 }}
				className="flex flex-col w-5/6 gap-4 px-2 py-4 mx-auto ">
				{teamMembers && (
					<div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">
						{teamMembers.map((member: member) => (
							<div
								key={crypto.randomUUID()}
								className="bg-white rounded-[8px] ">
								<img
									loading="lazy"
									src={member.image}
									className={`object-top overlay-slate-800   rounded-t-[8px] ${
										member.names.toLocaleLowerCase().includes("nzanana") ||
										member.names.toLocaleLowerCase().includes("umuhoza")
											? " object-contain"
											: " object-cover"
									} w-full p-0 h-52`}
								/>
								<p className="px-4 py-1 font-bold text-center">
									{member.names}
								</p>
								<p className="px-4 py-1 text-sm text-center">{member.title}</p>
							</div>
						))}
					</div>
				)}
			</motion.div>
		</AnimatePage>
	);
}

export default OurTeam;
