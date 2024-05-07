import { Link } from "react-router-dom";
import useFetchData from "../../../Hooks/UseFetchData";
import { EventPost } from "../../../Shared/types";

function AllEvents() {
	const { data: events, loading } = useFetchData<EventPost[]>("/events");

	return (
		<div>
			<div className="flex items-center justify-between">
				<p className="font-bold">All Events </p>
				<Link
					to="create"
					className="p-2 blog text-xs font-bold rounded-[4px] text-white bg-purple-900">
					Create event
				</Link>
			</div>
			<div className="grid grid-cols-4 gap-4">
				{loading && <p>Loading ...</p>}
				{events &&
					events.map((el: EventPost) => (
						<Link className="block w-full p-1" to={el.refId ? el.refId : ""}>
							<div className="bg-white rounded-[8px]">
								<div className="w-full p-1 ">
									<img
										loading="lazy"
										src={el.coverImage}
										className="block object-contain w-full  h-32 rounded-[8px]"
									/>
									<p className="my-2 text-xs font-semibold ">{el.title}</p>
								</div>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
}

export default AllEvents;
