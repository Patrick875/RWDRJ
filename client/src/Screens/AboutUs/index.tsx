import { motion } from "framer-motion";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import marker from "./../../assets/marker.gif";
import Carousel from "./Carousel";
import {
	AboutContent,
	CarouselItem,
	NewsItem,
	partner,
	sectionSchema,
	video,
} from "../../Shared/types";
import { Link, useNavigate } from "react-router-dom";
import { TbWorld } from "react-icons/tb";
import Count from "./Count";
import Slider from "react-slick";
import TwitterTimeLine from "./TwitterTimeLine";
import useFetchData from "../../Hooks/UseFetchData";
import { HiCalendarDays } from "react-icons/hi2";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { IoIosPlayCircle } from "react-icons/io";

function Partners({ partners }: { partners: partner[] }) {
	const isAboveMediumScreens = useMediaQuery("(min-width:1060px");

	const settings = {
		infinite: true,
		autoplay: true,
		speed: 500,
		slidesToShow: isAboveMediumScreens ? 5 : 2,
		slidesToScroll: 1,
		arrows: false,
		dots: isAboveMediumScreens ? true : false,
	};
	return (
		<div className="flex-1 partner-slider">
			<Slider {...settings}>
				{partners &&
					partners.map((part: partner) => (
						<div className="relative block group" key={crypto.randomUUID()}>
							<div className="h-56  md:h-32 w-full  group-hover:visible invisible z-20 absolute  bg-[rgba(0,0,0,0.44)]">
								<Link
									to={part.link}
									target="blank"
									className="flex items-center justify-center w-full h-32">
									<TbWorld className="w-8 h-8 text-white" />
								</Link>
							</div>
							<img
								loading="lazy"
								src={part.logo}
								className="block object-contain w-full h-32 bg-transparent md:object-center "
							/>
						</div>
					))}
			</Slider>
		</div>
	);
}
function MobileVideos({
	videos,
	setSelectedVideo,
}: {
	videos: video[];
	setSelectedVideo: React.Dispatch<React.SetStateAction<video>>;
}) {
	const settings = {
		infinite: false,
		autoplay: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
	};
	return (
		<div className="flex-1 w-full h-full partner-slider">
			<Slider {...settings}>
				{videos &&
					videos.map((vid: video) => (
						<div
							onClick={() => {
								setSelectedVideo(vid);
							}}
							className="relative"
							key={crypto.randomUUID()}>
							<div
								onClick={() => {
									setSelectedVideo(() => vid);
								}}
								className="flex items-center justify-center w-full h-[90%] bg-black"
								style={{
									padding: "12px",
									backgroundImage: `url("${vid.thumb}")`,
									backgroundSize: "cover",
									backgroundPosition: "center",
								}}
								key={crypto.randomUUID()}>
								<IoIosPlayCircle className="text-6xl text-pink-800" />
							</div>
							<p className="font-bold">{vid.title}</p>
						</div>
					))}
			</Slider>
		</div>
	);
}

const AboutUs = () => {
	const { data: news } = useFetchData<NewsItem[]>("/news");
	const { data: partners } = useFetchData<partner[]>("/partners");
	const [sliderImages, setSliderImages] = useState<string[]>([]);
	const { data: aboutContent } = useFetchData<AboutContent[]>("/aboutus");
	const [selectedVideo, setSelectedVideo] = useState<video>({
		title: "International Women's Day - Women Doctors",
		url: "https://youtu.be/ZFMCR_MVrfg",
		thumb:
			"https://res.cloudinary.com/didikwl4i/image/upload/v1714253046/thumb2_o7syci.jpg",
	});
	const container = {
		visible: {
			hidden: { opacity: 0 },
			visible: { opacity: 1 },
			transition: { staggerChildren: 0.2 },
		},
	};
	const containerSides = {
		offscreen: {
			y: 300,
		},
		onscreen: {
			y: 50,
			rotate: -10,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 0.4,
			},
		},
	};

	const customIcon = new Icon({
		iconUrl: marker,
		iconSize: [38, 38],
	});

	const carouselItems: CarouselItem[] = sliderImages.map((item: string) => ({
		img: item,
	}));

	const navigate = useNavigate();
	const isAboveMediumScreens = useMediaQuery("(min-width:1060px");

	const videos: video[] = [
		{
			url: "https://youtu.be/ZFMCR_MVrfg",
			title: "International Women's Day - Women Doctors",
			thumb:
				"https://res.cloudinary.com/didikwl4i/image/upload/v1714253046/thumb2_o7syci.jpg",
		},
		{
			url: "https://www.youtube.com/watch?v=79VyUWkdh88",
			title: "16 Days of Activism against Gender-Based Violence #EndGBV",
			thumb:
				"https://res.cloudinary.com/didikwl4i/image/upload/v1714253047/thumb1_sl8c99.jpg",
		},
	];

	useEffect(() => {
		if (aboutContent) {
			setSliderImages(aboutContent[0].herosection.sliderImages);
		}
	}, [aboutContent]);

	// const news: NewsItem[] = [];

	return (
		<div>
			<section
				id="aboutus"
				className=" flex flex-col min-h-[50vh] md:min-h-[108vh] overflow-x-hidden">
				<Carousel
					items={carouselItems}
					className="w-full m-0 h-96 sm:h-64 xl:h-80 2xl:h-96"
				/>
			</section>
			<section id="whatwedo" className=" -mt-[4vh] bg-primary-orangeTrans">
				<div className="flex justify-center w-5/6 mx-auto">
					<div className="flex min-h-[90vh] flex-col  flex-1 w-full px-2 md:flex-row">
						<motion.div
							initial="hidden"
							whileInView="visible"
							transition={{ delay: 0.4, duration: 0.4 }}
							viewport={{ once: true, amount: 0.5 }}
							variants={container}
							className="flex flex-col items-center justify-center flex-1 h-full ">
							<img
								loading="lazy"
								className="block object-contain md:mt-0 mt-4 rounded-[10px] "
								src={
									aboutContent && aboutContent.length !== 0
										? aboutContent[0].whoWeAreSection.coverImage
										: ""
								}
								alt="woman-graphic"
							/>
						</motion.div>

						<div className="flex flex-col items-center justify-center w-full md:w-1/2 ">
							<motion.div
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.5 }}
								transition={{ delay: 0.6, duration: 0.8 }}
								variants={{
									hidden: { opacity: 0, x: -50 },
									visible: { opacity: 1, x: 0 },
								}}
								className="p-6 py-0 pt-4 ">
								<p className="w-full text-2xl font-bold text-center md:text-start md:w-1/2">
									{aboutContent ? aboutContent[0].whoWeAreSection.title : ""}
								</p>
								<p className="my-3 text-lg text-center md:text-start">
									{aboutContent ? aboutContent[0].whoWeAreSection.content : ""}
								</p>
								<div className="flex justify-center ">
									<Link
										to={
											aboutContent ? aboutContent[0].whoWeAreSection.link : ""
										}
										className="w-full py-2 my-6 text-lg text-center transition-all bg-white rounded-full shadow-md outline-none md:w-1/2 hover:bg-blue-900 hover:text-white">
										{aboutContent
											? aboutContent[0].whoWeAreSection.linkText
											: ""}
									</Link>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full bg-blue-900">
				<motion.div
					id="whatwedo"
					initial="hidden"
					whileInView="visible"
					transition={{ delay: 0.2, duration: 0.6 }}
					viewport={{ amount: 0.4 }}
					variants={containerSides}
					className="flex flex-col w-5/6 gap-4 py-4 mx-auto ">
					<div className="w-2/3 mx-auto">
						<p className="w-full my-1 text-2xl font-bold text-center text-white">
							{aboutContent ? aboutContent[0].whatWeDoSection.title : ""}
						</p>
					</div>
					<div className="flex flex-col ">
						{aboutContent
							? aboutContent[0].whatWeDoSection.sections.map(
									(sect: sectionSchema, i) => (
										<motion.div
											initial={{ opacity: 0, x: i % 2 !== 1 ? -50 : 50 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ amount: 0.3, once: true }}
											transition={{ duration: 0.4, delay: 0.3 }}
											key={sect.title}
											className={`flex flex-col md:flex-row flex-1  p-8 bg-white ${
												i % 2 !== 0 && " md:flex-row-reverse "
											} `}>
											<img
												loading="lazy"
												className="block object-cover rounded-[12px] w-full md:w-1/2 h-56  "
												src={sect.coverImage}
												alt={sect.title.toLowerCase()}
											/>
											<div className="flex flex-col w-full pt-0 md:px-6 md:w-1/2">
												<div className="flex-1">
													<p className="my-4 mb-4 text-xl font-bold text-center md:text-start md:mt-0 text-bold ">
														{sect.title}
													</p>
													<p className="flex flex-col justify-center font-normal text-center md:text-justify">
														{sect.content}
													</p>
													<div className="flex justify-center md:justify-start">
														<Link
															to={sect.link}
															className="my-4 px-6 py-1 rounded-full md:rounded-[4px] text-lg border-[1.5px] hover:bg-primary-orange hover:text-white transition-all  text-primary-orange bg-white  border-primary-orange">
															{sect.linkText}
														</Link>
													</div>
												</div>
											</div>
										</motion.div>
									)
							  )
							: "loading..."}
					</div>
				</motion.div>
			</section>
			<section className="w-full py-6 bg-gradient-to-t from-primary-orange to-primary-orangeTrans">
				<div className="grid w-5/6 grid-cols-1 gap-3 py-6 mx-auto bg-white md:gap-0 md:grid-cols-3 font-montserrat ">
					{aboutContent ? (
						aboutContent[0].statisticSection.statiticGroups.map((stat) => (
							<div className="text-center">
								<div className="flex items-center justify-center text-2xl font-bold">
									<Count interval={6} countTo={stat.currentNumber} />
									{stat.andMore && (
										<p className="inline text-xl ps-2 font-hanuman">+</p>
									)}
								</div>
								<p className="font-semibold">{stat.title}</p>
							</div>
						))
					) : (
						<p className="text-center">numbers loading ...</p>
					)}
				</div>
			</section>
			<section className="min-h-[60vh] md:min-h-[50vh] w-5/6 mx-auto">
				<p className="w-full my-1 text-2xl font-bold text-center ">Showroom</p>
				<div className="flex flex-col gap-4 md:flex-row">
					<div className="w-full md:w-1/2 min-min-h-[25vh]">
						<ReactPlayer
							url={selectedVideo.url}
							controls={true}
							width="100%"
							playing={true}
							style={{ height: "20vh" }}
						/>
					</div>
					{isAboveMediumScreens ? (
						<div className="md:w-1/2  w-full h-[90vh] md:h-[44vh] md:overflow-y-scroll  grid grid-cols-2  md:grid-cols-2 gap-3 my-1">
							{videos &&
								videos.map((vid: video) => (
									<div>
										<div
											onClick={() => {
												setSelectedVideo(() => vid);
											}}
											className="flex items-center justify-center w-full h-full bg-black cursor-pointer"
											style={{
												padding: "8px",
												backgroundImage: `url("${vid.thumb}")`,
												backgroundSize: "cover",
												backgroundPosition: "center",
											}}
											key={crypto.randomUUID()}>
											<IoIosPlayCircle className="text-6xl text-[#ff0000]  bg-white rounded-full" />
										</div>
										<p className="font-bold ">{vid.title}</p>
									</div>
								))}
						</div>
					) : (
						<div className="">
							<MobileVideos
								setSelectedVideo={setSelectedVideo}
								videos={videos}
							/>
						</div>
					)}
				</div>
			</section>
			<motion.section
				id="news"
				viewport={{ once: false, amount: 0.3 }}
				initial={{ opacity: 0.2 }}
				animate={{ opacity: 1 }}
				className="flex flex-col w-5/6 gap-4 px-2 py-4 mx-auto min-h-[42vh]  md:min-h-[60vh]">
				<div className="w-full mx-auto md:w-2/3">
					<p className="w-full my-1 mt-12 text-2xl font-bold text-center ">
						Newsroom
					</p>
				</div>
				<div className="flex-1 ">
					<div className="h-full">
						{news && news.length !== 0 && (
							<div>
								<div className="grid h-full grid-cols-1 gap-2 md:grid-cols-3">
									{news.slice(0, 3).map((blog) =>
										Object.keys(blog).includes("content") ? (
											<div
												className="w-full bg-white rounded-[8px] hover group cursor-pointer"
												onClick={() => {
													navigate(`news/blogs/${blog.refId}`);
												}}>
												<div className="relative flex items-center justify-center h-32 overflow-hidden ">
													<img
														src={blog.coverImage}
														className="absolute block object-cover w-full h-full my-2 transition-all ease-in delay-75 group-hover:scale-105 "
													/>
												</div>
												<p className="px-2 py-1 text-xl font-bold capitalize">
													{blog.title}
												</p>
												{/* {<p className="px-2 py-1 text-lg capitalize">{content}</p>} */}

												<div className="px-2 py-2 ">
													<p className="text-sm font-bold">RWDRJ</p>
												</div>
											</div>
										) : (
											<div
												onClick={() => {
													navigate(`news/events/${blog.refId}`);
												}}
												className="w-full bg-white rounded-[8px] cursor-pointer  group">
												<div className="relative flex items-center justify-center h-32 overflow-hidden">
													<img
														src={blog.coverImage}
														className="absolute block object-cover w-full h-full my-2 transition-all ease-in delay-75 group-hover:scale-105 "
													/>
												</div>
												<p className="px-2 py-1 font-bold capitalize ">
													{blog.title}
												</p>

												<div className="px-2 py-2 font-bold">
													<p className="flex items-center gap-2 text-xs ">
														<HiCalendarDays className="text-lg text-gray-500 " />
														{blog.datestart
															? new Date(blog.datestart).toLocaleDateString(
																	"fr-FR"
															  )
															: null}{" "}
														<span className="font-bold"> - </span>
														{blog.dateend
															? new Date(blog.dateend).toLocaleDateString(
																	"fr-FR"
															  )
															: null}
													</p>
													<p className="text-sm ">RWDRJ</p>
												</div>
											</div>
										)
									)}
								</div>
								<div className="flex justify-center">
									<Link
										to="/news"
										className="my-4 px-6 py-1 rounded-full md:rounded-[4px] text-lg border-[1.5px] hover:bg-primary-orange hover:text-white transition-all  text-primary-orange bg-white  border-primary-orange">
										More news
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</motion.section>
			<motion.section
				id="news"
				viewport={{ once: false, amount: 0.3 }}
				initial={{ opacity: 0.2 }}
				animate={{ opacity: 1 }}
				className="flex flex-col w-5/6 gap-4 px-2 py-4 mx-auto ">
				<div className="w-full mx-auto md:w-2/3">
					<p className="w-full my-1 text-2xl font-bold text-center ">
						Follow us{" "}
					</p>
				</div>
				<div className="grid grid-cols-1 gap-2 ">
					<div>
						<p className="font-bold ">RWDRJ Tweets</p>
						<TwitterTimeLine
							profile={
								aboutContent ? aboutContent[0].twitterProfile : "doctors_women"
							}
						/>
					</div>
				</div>
			</motion.section>
			<motion.div
				id="ourpartners"
				viewport={{ once: true, amount: 0.2 }}
				initial={{ opacity: 0.1, y: -50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.4 }}
				className="w-full py-3 bg-white  min-h-[26vh] md:min-h-[24vh] flex flex-col">
				<div className="flex-1 w-5/6 py-4 mx-auto">
					<p className="w-full my-1 text-2xl font-bold text-center ">
						Our Partners
					</p>
					{partners && partners.length > 0 ? (
						<div className="md:h-[24vh] w-5/6 mx-auto  mt-2 md:mt-12">
							<Partners partners={partners} />
						</div>
					) : null}
				</div>
			</motion.div>
			<section id="contactus" className="w-5/6 md:py-8 mx-auto min-h-[40vh]">
				<p className="py-4 text-2xl font-bold text-center">Contact Us</p>
				<div className="flex flex-col-reverse items-center w-full md:items-start md:flex-row ">
					<div className="w-full my-6 text-lg md:w-1/2">
						<p className="font-bold text-center text-gray-600 md:text-start md:text-xl">
							For any queries or concerns, don't hesitate to contact us
						</p>
						<p className="my-2 font-light text-center md:text-start">
							Call us directly
						</p>
						<p className="my-2 font-bold text-center md:text-start ">
							+250 782 864 790 / +250 794 418 097
						</p>
						<p className="my-2 font-light text-center md:text-start">
							Contact email
						</p>
						<p className="my-2 font-bold text-center md:text-start">
							womenreproductivejustice@gmail.com
						</p>
						<p className="my-2 font-bold text-center md:text-start">
							eb@womenrepro.org
						</p>

						<Link
							to="contactus"
							className="md:w-1/3 w-full   p-2 block my-4 md:my-2  text-center font-bold rounded-full md:rounded-[4px]  border-[1.5px] hover:bg-slate-800 hover:text-white transition-all  text-slate-800 bg-white  border-slate-800">
							Reach out{" "}
						</Link>
					</div>
					<div className="w-full md:w-1/2 min-h-[60vh] md:min-h-[62vh] ">
						<MapContainer
							className="w-full min-h-[60vh] rounded-[8px] "
							center={[-1.936763, 30.089463]}
							zoom={13}
							scrollWheelZoom={false}>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker icon={customIcon} position={[-1.936763, 30.089463]}>
								<Popup>
									<p className="font-bold text-primary-orange">20 KG 596 St</p>
								</Popup>
							</Marker>
						</MapContainer>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutUs;
