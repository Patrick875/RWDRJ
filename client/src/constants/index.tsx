import { navItem, section, partner, sidenavType } from "../Shared/types";
import { MdEventAvailable, MdOutlineRestorePage } from "react-icons/md";

import { IoHomeOutline } from "react-icons/io5";
import { CiTextAlignJustify } from "react-icons/ci";

export const navs: navItem[] = [
	{
		text: "About us",
		to: "",
	},
	{
		text: "what we do",
		to: "whatwedo",
		subnavs: [
			{
				title: "Advocacy",
				to: "whatwedo/advocacy",
			},
			{
				title: "Compaign&Organizing",
				to: "whatwedo/campaign-organizing",
			},
			{
				title: "Training",
				to: "whatwedo/training",
			},
			{
				title: "Service Provision , Digital Health & SRHR",
				to: "whatwedo/service-provision",
			},
			// {
			// 	title: "Digital Health & SRHR",
			// 	to: "whatwedo/digital-health",
			// },
		],
	},
	{
		text: "Our Team",
		to: "ourteam",
	},
	{
		text: "News",
		to: "news",
	},
	// {
	// 	text: "Events",
	// 	to: "events",
	// },
	{
		text: "Contact us",
		to: "contactus",
	},
];

export const sections: section[] = [
	{
		content: `As a group of young women doctors, advocating for access to
									legal and safe SRHR and friendly services is significantly
									essential. We recognize women and girls' catastrophic
									complications when they are denied rights to reproductive
									services and opt for dangerous traditional options.`,
		title: "Advocacy",
		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953554/RWDJ-IMAGES/advocacy_mnyasq.webp",
		moreLink: "whatwedo/advocacy",
	},
	{
		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953554/RWDJ-IMAGES/Campaign_cdsg7b.webp",
		title: "Campaign&Organizing",
		moreLink: "whatwedo/campaign-organizing",
		content:
			"We believe in The power of feminist organizing.  Through collective actions, we aim to transform the gender relations that subordinate and devalue women. Feminist organizing sustains our movement and advances autonomy and equality for all women.",
	},
	{
		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953713/RWDJ-IMAGES/training_t1nyco.webp",
		title: "Training",
		moreLink: "whatwedo/training",
		content:
			"Strengthening the network of young women pro-choice physicians: young physicians in Rwanda are less bound by abortion stigma than older physicians in Rwanda. ",
	},
	{
		title: "Service Provision & Digital Health & SRHR",
		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1712939108/IMG_5647_fylfhn.jpg",
		moreLink: "whatwedo/service-provision",
		content:
			"Nationally, abortion is only permissible in cases of rape, when the pregnant person is a child, forced marriage, in cases of incest committed with a person to the second degree of kinship, and when the pregnancy puts a risk to the health of the pregnant person or of the fetus.",
	},
];

// export const partners: partner[] = [
// 	{
// 		link: "https://youngfeministfund.org/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953556/RWDJ-IMAGES/partner1_amjw3o.gif",
// 	},
// 	{
// 		link: "https://numun.fund/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953557/RWDJ-IMAGES/partner2_uolebp.webp",
// 	},
// 	{
// 		link: "https://www.medicaldoctorsforchoice.org/mscf",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953557/RWDJ-IMAGES/partner3_gwqnhq.webp",
// 	},
// 	{
// 		link: "https://www.flavoursfp.org/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953557/RWDJ-IMAGES/partner4_lfsw82.webp",
// 	},
// 	{
// 		link: "https://www.afriyanrwanda.org/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1711030480/RWDJ-IMAGES/afriyan_logo_ciythu.jpg",
// 	},
// 	{
// 		link: "https://msfc.org/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953557/RWDJ-IMAGES/partner5_tuokco.webp",
// 	},
// 	{
// 		link: "https://afroark.org/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953557/RWDJ-IMAGES/partner6_wzv1u5.webp",
// 	},
// 	{
// 		link: "https://app.companion.rw/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953558/RWDJ-IMAGES/partner7_ssllnm.webp",
// 	},
// 	{
// 		link: "https://www.medsarwanda.org/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953558/RWDJ-IMAGES/partner8_u0lpxl.webp",
// 	},
// 	{
// 		link: "https://www.flavoursfp.org/save-safe-abortion-videos-edutainment",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953558/RWDJ-IMAGES/partner9_khc16p.webp",
// 	},
// 	{
// 		link: "https://www.hprwanda.org/",
// 		img: "https://res.cloudinary.com/didikwl4i/image/upload/v1708953558/RWDJ-IMAGES/partner10_ofwzzc.webp",
// 	},
// ];

export const objectives: string[] = [
	" Improve the access for girls and women in Rwanda to high quality sexual reproductive health services.",
	" Increase knowledge and acceptance of safe abortion care, family planning and SRHR education among health care providers.",
	" Amplify women and girls' voice in the Rwandan context.",
	" Create safe space for girls and women in Rwanda for knowledge sharing and access to SRHR information.",
	" Advocate for laws and policy that advance women's right.",
	" Integrate digital technology in advancing women's right.",
	" Conduct impact research related to right and SRHR.",
	" Strengthen the network of feminists in Rwanda.",
	" Increase access to legal support for girls and women related to sexual reproductive rights.",
	" Increase the partnership with other feminist organizations both locally and internationally.",
];

export const serverUrl = "https://rwdrj-server-0a7m.onrender.com/";
export const localServerUrl = "http://localhost:5000/";
export const frontendUrl = "http://localhost:5173";

export const sidenavs: sidenavType[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <IoHomeOutline />,
		location: "",
	},
	{
		page: "Pages",
		link: "pages",
		icon: <MdOutlineRestorePage />,
		location: "pages",
	},
	{
		page: "Events",
		link: "events",
		icon: <MdEventAvailable />,
		location: "events",
	},
	{
		page: "Blogs",
		link: "blogs",
		icon: <CiTextAlignJustify />,
		location: "blogs",
	},
];

export function formatDate(date: string): string {
	// Extract date components
	const year = new Date(date).getFullYear();
	const month = String(new Date(date).getMonth() + 1).padStart(2, "0"); // Month is zero-based
	const day = String(new Date(date).getDate()).padStart(2, "0");
	const hours = String(new Date(date).getHours()).padStart(2, "0");
	const minutes = String(new Date(date).getMinutes()).padStart(2, "0");

	// Format date string
	const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

	return formattedDate;
}
export function formatPostedDate(date: string): string {
	// Extract date components
	const year = new Date(date).getFullYear();
	const month = String(new Date(date).getMonth() + 1).padStart(2, "0"); // Month is zero-based
	const day = String(new Date(date).getDate()).padStart(2, "0");
	const hours = String(new Date(date).getHours()).padStart(2, "0");
	const minutes = String(new Date(date).getMinutes()).padStart(2, "0");

	// Format date string
	const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

	return formattedDate;
}

export const fileToDataURL = (file: File): Promise<any> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(file);
	});
};
