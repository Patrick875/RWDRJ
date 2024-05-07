import { NavLink, Outlet, useLocation } from "react-router-dom";
import { navItem } from "../../../Shared/types";

function Pages() {
	const { pathname } = useLocation();
	const url = pathname.split("/");
	const navs: navItem[] = [
		{
			text: "Pages",
			to: "",
		},
		{
			text: "Team members",
			to: "team",
		},
		{
			text: "Partners",
			to: "partners",
		},
		{
			text: "General Info",
			to: "generalinfo",
		},
	];

	return (
		<div className="relative bg-slate-50">
			<nav className="sticky top-0 z-10 w-full p-6 bg-white shadow-sm">
				<div className="flex gap-4">
					{navs.map((nav: navItem) => (
						<NavLink
							to={nav.to}
							className={({ isActive }) =>
								`flex text-sm items-center gap-3 p-2 font-medium ${
									(isActive && nav.to === url[4]) ||
									(url.length === 4 && nav.to === "")
										? `text-white font-semibold bg-sky-900 rounded-tr-[6px] rounded-bl-[6px]`
										: " text-primary-white hover:bg-sky-900 duration-300 ease-in-out delay-50"
								} `
							}>
							{nav.text}
						</NavLink>
					))}
				</div>
			</nav>
			<div className="min-h-[86vh] px-3">
				<Outlet />
			</div>
		</div>
	);
}

export default Pages;
