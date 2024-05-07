import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
	page: string;
	link: string;
	location: string;
	defaultColor?: string;
	children: ReactNode;
}

export const NavItem = ({ link, location, children }: Props) => {
	const { pathname } = useLocation();
	const url = pathname.split("/");

	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`flex text-sm items-center gap-3 p-2 font-medium ${
					isActive && location === url[3]
						? `text-white font-semibold bg-primary-orange rounded-tr-[6px] rounded-bl-[6px]`
						: " text-primary-white hover:bg-primary-orange duration-300 ease-in-out delay-50"
				} `
			}>
			{children}
		</NavLink>
	);
};
