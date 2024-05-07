import { Link } from "react-router-dom";
import { sections } from "../constants";
import { section } from "./types";

function MoreLinks({ current }: { current: string }) {
	return (
		<div>
			<p className="py-2 text-sm font-bold ">More of what we do</p>
			<div className="flex flex-col gap-1 md:gap-4 md:flex md:flex-row">
				{sections
					.filter((el: section) => el.title !== current)
					.map((sect: section) => (
						<Link
							to={`/${sect.moreLink}`}
							className=" block  text-center my-1 md:my-4 px-6 py-1 capitalize rounded-[4px] text-xs border-[1.5px] hover:bg-primary-orange hover:text-white transition-all  text-primary-orange bg-white text border-primary-orange">
							{sect.title}
						</Link>
					))}
			</div>
		</div>
	);
}

export default MoreLinks;
