import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import useFetchData from "../../Hooks/UseFetchData";
import { EventPost } from "../../Shared/types";

function EventDetails() {
	const { refId } = useParams();
	const { data: event, loading } = useFetchData<EventPost>(`/events/${refId}`);

	return (
		<div>
			{loading && <p>Loading ...</p>}
			{!loading && event && (
				<div>
					<div
						className="w-full h-48 bg-center bg-cover rounded-[8px]"
						style={{ backgroundImage: `url(${event.coverImage})` }}>
						<div className="bg-[rgb(0,0,0,0.6)] h-48 flex justify-center items-center">
							<div>
								<p className="w-full p-2 text-center text-white bg-transparent font-hanuman focus:border-blue-500 ">
									{event.title}
								</p>
							</div>
						</div>
					</div>

					{event && (
						<div className="w-5/6 mx-auto">{parse(event.description)}</div>
					)}
				</div>
			)}
		</div>
	);
}

export default EventDetails;
