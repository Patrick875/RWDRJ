import { Link } from "react-router-dom";
import useFetchData from "../../../Hooks/UseFetchData";
import { member } from "../../../Shared/types";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function TeamMembers() {
	const { data: teamMembers } = useFetchData<member[]>("/teammembers");

	return (
		<div>
			{teamMembers && (
				<div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">
					{teamMembers.map((member: member) => (
						<div
							key={crypto.randomUUID()}
							className=" group transition-all ease-in-out delay-1000 cursor-pointer relative  bg-white rounded-[8px] ">
							<div className=" absolute w-full h-full group-hover:flex hidden flex-col justify-center  items-center  z-2 bg-[rgba(0,0,0,0.5)]">
								<Link
									to={`${member?._id}`}
									className="px-4 py-1 font-semibold bg-white rounded-sm font-montserrat ">
									Edit details{" "}
								</Link>
							</div>
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
							<p className="px-4 py-1 font-bold text-center">{member.names}</p>
							<p className="px-4 py-1 text-sm text-center">{member.title}</p>
							{/* {member.socialMedias && member.socialMedias.length !== 0 && (
								<div className="flex justify-center my-2">
									<div className="flex items-center gap-2 ">
										{member.socialMedias.map((el) => {
											if (el.name === "facebook" && el.link !== "") {
												return (
													<Link className="block" to="">
														<FaFacebook className="text-lg" />
													</Link>
												);
											} else if (el.name === "twitter" && el.link !== "") {
												return (
													<Link className="block" to={el.link}>
														<FaSquareXTwitter className="text-lg" />
													</Link>
												);
											} else if (el.name === "linkedin" && el.link !== "") {
												return (
													<Link className="block" to={el.link}>
														<FaInstagram className="text-lg" />
													</Link>
												);
											} else if (el.name === "instagram" && el.link !== "") {
												return (
													<Link className="block" to={el.link}>
														<FaInstagram className="text-lg" />
													</Link>
												);
											} else {
												null;
											}
										})}
									</div>
								</div>
							)} */}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default TeamMembers;
