import useFetchData from "../../Hooks/UseFetchData";
import Event from "../../Shared/Event";
import { EventPost } from "../../Shared/types";

function Events() {
	const { data: events } = useFetchData<EventPost[]>("/events");

	return (
		<div className="w-full">
			{events && events.length !== 0 ? (
				<div className="grid w-full grid-cols-4 gap-2 ">
					{events.map((el: EventPost) => (
						<Event event={el} key={el.refId} />
					))}
				</div>
			) : (
				<p className="text-xs">Events will be posted here.</p>
			)}
		</div>
	);
}

export default Events;
