import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { navs } from "../../constants";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import useFetchData from "../../Hooks/UseFetchData";
import { SiteData } from "../../Shared/types";
const Footer = () => {
	const { data: siteData } = useFetchData<SiteData[]>("/");
	return (
		<footer className=" min-h-[50vh]    text-white bg-[#0A142F] bg-primary-100">
			<div className="flex justify-center w-5/6 h-full gap-16 py-8 mx-auto md:justify-normal">
				<div className="w-full mt-8 md:mt-0">
					<div className="flex justify-center w-full">
						<Link to="" className="block">
							<div className="flex items-center gap-2">
								<img
									loading="lazy"
									className="block w-20 h-20"
									src={Logo}
									alt="hike-guide-logo"
								/>
								<p className="text-lg font-bold text-primary-orange">RWDRJ</p>
							</div>
						</Link>
					</div>
					<div className="w-11/12 mx-auto text-center ">
						<p className="my-3 text-xl font-lora">
							{siteData && siteData[0].title}
						</p>
						<p className="my-2 text-lg ">{siteData && siteData[0].subtitle}</p>
					</div>

					<hr className="bg-white border-[1px] mt-18" />
					<div className="flex flex-col justify-between w-full mt-4 md:flex-row">
						<div className="flex justify-center md:justify-normal">
							<div className="flex gap-4 my-3">
								{navs.map((nav) => (
									<Link
										key={crypto.randomUUID()}
										className="block text-sm text-white md:text-lg"
										to={nav.to}>
										{nav.text}
									</Link>
								))}
							</div>
						</div>
						<div className="flex justify-center md:block">
							<div className="flex gap-4">
								<Link
									to="https://twitter.com/doctors_women"
									className="flex justify-center items-center rounded-full md:h-12 md:w-12  h-8 w-8  md:border-[1.8px] border-white">
									<FaSquareXTwitter className="text-2xl " />
								</Link>
								<div className="flex justify-center items-center rounded-full md:h-12 md:w-12 h-8 w-8  md:border-[1.8px] border-white">
									<FaYoutube className="text-2xl" />
								</div>
								<div className="flex justify-center items-center rounded-full md:h-12 md:w-12 h-8 w-8  md:border-[1.8px] border-white">
									<FaFacebook className="text-2xl" />
								</div>
								<div className="flex justify-center items-center rounded-full md:h-12 md:w-12  h-8 w-8 md:border-[1.8px] border-white">
									<FaInstagram className="text-2xl" />
								</div>
							</div>
						</div>
					</div>

					<p className="mt-2 text-center md:text-start">
						&copy;{new Date().getFullYear()} All Rights reserved Rwanda Women
						Doctors For Reproductive Justice .
					</p>
					{/* {<p className="py-1 text-lg text-center text-white">
						Developed By BAHO TECH INITIATIVE
					</p>} */}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
