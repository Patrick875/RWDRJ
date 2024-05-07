import ContactUsForm from "../AboutUs/ContactUsForm";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import marker from "./../../assets/marker.gif";
import AnimatePage from "../../Shared/AnimatePage";
import { contactusShema } from "../../Shared/types";
import useFetchData from "../../Hooks/UseFetchData";

function Contactus() {
	const { data: contactusContent } =
		useFetchData<contactusShema[]>("/contactus");
	const customIcon = new Icon({
		iconUrl: marker,
		iconSize: [38, 38],
	});

	return (
		<AnimatePage>
			<div
				style={{
					backgroundImage:
						contactusContent && contactusContent[0].coverImage
							? `url(${contactusContent[0].coverImage})`
							: "",
				}}
				className="flex flex-col items-center justify-center w-full h-[60vh] bg-center bg-cover ">
				<div className="flex flex-col items-center justify-center flex-1 w-full mx-auto bg-page-cover">
					<p className="w-5/6 text-3xl font-bold text-center text-white">
						{contactusContent && contactusContent[0].title
							? contactusContent[0].title
							: ""}
					</p>
				</div>
			</div>
			<section id="contactus" className="w-5/6 py-8 mx-auto">
				<p className="py-4 text-lg font-bold text-gray-600">Contact Us</p>
				<div className="flex flex-col-reverse w-full md:flex-row">
					<div className="w-full pr-8 md:w-1/2">
						<ContactUsForm />
					</div>
					<div className="w-full md:w-1/2">
						<p className="text-xl font-bold text-gray-600">
							For any queries or concerns, don't hesitate to contact us
						</p>
						<p className="my-2 text-sm font-light">Call us directly</p>
						<p className="my-2 font-bold text-md">
							{contactusContent && contactusContent.length! == 0
								? contactusContent[0].phoneNumbers.map(
										(phone: string, index: number) => (
											<span className="pr-3" key={index + 1}>
												{phone}
											</span>
										)
								  )
								: "+250 782 864 790 / +250 794 418 097"}
						</p>
						<p className="my-2 text-sm font-light">Contact email</p>
						{contactusContent && contactusContent.length! == 0 ? (
							contactusContent[0].emails.map((email: string, index: number) => (
								<p key={index * 3} className="my-2 font-bold text-md">
									{email}
								</p>
							))
						) : (
							<>
								<p className="my-2 font-bold text-md">
									womenreproductivejustice@gmail.com
								</p>
								<p className="my-2 font-bold text-md">eb@womenrepro.org</p>
							</>
						)}

						<MapContainer
							className="w-full h-52 rounded-[8px]"
							center={[-1.936763, 30.089463]}
							zoom={13}
							scrollWheelZoom={false}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker icon={customIcon} position={[-1.936763, 30.089463]}>
								<Popup>
									<p className="text-xs font-bold text-primary-orange">
										{contactusContent && contactusContent.length! == 0
											? contactusContent[0].location
											: "KG 596 ST 20"}
									</p>
								</Popup>
							</Marker>
						</MapContainer>
					</div>
				</div>
			</section>
		</AnimatePage>
	);
}

export default Contactus;
