import { Link } from "react-router-dom";
import useFetchData from "../../../Hooks/UseFetchData";
import { partner } from "../../../Shared/types";

function AllPartners() {
	const { data: partners } = useFetchData<partner[]>("/partners");

	return (
		<div>
			<div className="flex justify-end">
				<Link
					to="create"
					className=" block px-4 py-1 mb-2 text-xs font-medium bg-purple-900 rounded rounded-2 text-slate-100">
					Add new partner
				</Link>
			</div>

			{partners && (
				<div className="grid grid-cols-1 gap-3 md:grid-cols-3 ">
					{partners.map((part: partner) => (
						<div
							key={crypto.randomUUID()}
							className=" group transition-all ease-in-out delay-1000 cursor-pointer relative  bg-white rounded-[8px] ">
							<div className=" absolute w-full h-full group-hover:flex hidden flex-col justify-center  items-center  z-2 bg-[rgba(0,0,0,0.5)]">
								<Link
									to={`${part._id}`}
									className="bg-white px-4 py-1 font-semibold rounded-sm font-montserrat ">
									Edit details{" "}
								</Link>
							</div>
							<img
								loading="lazy"
								src={part.logo}
								className="object-top overlay-slate-800 rounded-t-[8px] object-contain w-full p-0 h-52"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default AllPartners;
