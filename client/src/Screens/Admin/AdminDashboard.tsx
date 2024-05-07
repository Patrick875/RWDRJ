import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

function AdminDashboard() {
	const isOpen: boolean = false;

	return (
		<div className="grid grid-cols-8 md:grid w-100">
			<SideBar />
			<div className="col-span-6 md:col-span-6 ">
				<div
					className={`${isOpen ? " hidden " : " "}min-h-screen   bg-slate-100`}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default AdminDashboard;
