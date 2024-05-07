import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Topbar from "../../Shared/Topbar";
import { useEffect, useState } from "react";
import ScrollToTopButton from "../../Shared/ScrollToTopButton";

const Layout = () => {
	const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				setIsTopOfPage(true);
			}
			if (window.scrollY !== 0) setIsTopOfPage(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<div className="w-full bg-[#ececec]" style={{ scrollBehavior: "smooth" }}>
			<div>
				<Topbar isTopOfPage={isTopOfPage} />
				<ScrollToTopButton />
				<Outlet />
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
