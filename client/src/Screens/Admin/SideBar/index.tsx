import { SlLogout } from "react-icons/sl";
import Logo from "../../../Shared/Logo";
import { sidenavs } from "../../../constants";
import { NavItem } from "./NavItem";

function SideBar() {
	return (
		<div className="min-h-screen col-span-2 ">
			<div className="fixed w-full">
				<div className="mt-0 pt-0 h-[20vh]">
					<Logo />
				</div>
				<div className="h-[70vh]">
					{sidenavs.map((el) => (
						<NavItem
							key={crypto.randomUUID()}
							page={el.page}
							location={el.location}
							link={el.location}>
							{el.icon}
							{el.page}
						</NavItem>
					))}
				</div>
				<div className="h-[10vh]">
					<NavItem page="Logout" link="" location="logout">
						<SlLogout />
						<p>Logout</p>
					</NavItem>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
