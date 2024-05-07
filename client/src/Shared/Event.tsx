import { HiCalendarDays } from "react-icons/hi2";
import { EventPost } from "./types";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
	event: EventPost;
}

function Event({ event }: Props) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const location = pathname.split("");
	const detailsLinks =
		location.length === 1 ? `news/events/${event.refId}` : `${event.refId}`;

	return (
		<div
			onClick={() => {
				navigate(`${detailsLinks}`);
			}}
			className="w-full bg-white rounded-[8px] cursor-pointer  group">
			<div className="relative flex items-center justify-center h-32 overflow-hidden">
				<img
					src={event.coverImage}
					className="absolute block object-cover w-full h-full my-2 transition-all ease-in delay-75 group-hover:scale-105 "
				/>
			</div>
			<p className="px-2 py-1 font-bold capitalize ">{event.title}</p>

			<div className="px-2 py-2 font-bold">
				<p className="flex items-center gap-2 text-xs ">
					<HiCalendarDays className="text-lg text-gray-500 " />
					{event.datestart
						? new Date(event.datestart).toLocaleDateString("fr-FR")
						: null}{" "}
					<span className="font-bold"> - </span>
					{event.dateend
						? new Date(event.dateend).toLocaleDateString("fr-FR")
						: null}
				</p>
				<p className="text-sm ">RWDRJ</p>
			</div>
		</div>
	);
}

export default Event;
