import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function SocialLinks() {
	return (
		<div className="flex items-center gap-2 ">
			<FaSquareXTwitter className="text-lg" />
			<FaYoutube className="text-lg" />
			<FaFacebook className="text-lg" />
			<FaInstagram className="text-lg" />
		</div>
	);
}

export default SocialLinks;
