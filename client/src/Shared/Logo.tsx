import { Link } from "react-router-dom";
import logo from "./../assets/Logo.png";
import { SiteData } from "./types";
import useFetchData from "../Hooks/UseFetchData";
function Logo() {
	const { data: siteData } = useFetchData<SiteData[]>("/");

	return (
		<Link className="block" to="">
			<div className="flex items-center gap-2">
				{siteData && siteData[0].logo ? (
					<img
						loading="lazy"
						className="block w-20 h-20"
						src={siteData[0].logo}
						alt="RWDRJ-logo"
					/>
				) : (
					<img
						loading="lazy"
						className="block w-20 h-20"
						src={logo}
						alt="RWDRJ-logo"
					/>
				)}

				<p className="text-lg font-bold text-primary-orange">RWDRJ</p>
			</div>
		</Link>
	);
}

export default Logo;
