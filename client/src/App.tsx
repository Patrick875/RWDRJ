import { Route, Routes } from "react-router-dom";
import Layout from "./Screens/Layout";
import AboutUs from "./Screens/AboutUs";
import LayoutAdmin from "./Screens/Admin/LayoutAdmin";
import Login from "./Screens/Login";
// import RegisterUser from "./Screens/RegisterUser";
import AdminDashboard from "./Screens/Admin/AdminDashboard";
import PrivateRoute from "./Screens/Admin/PrivateRoute";
import WhoWeAre from "./Screens/WhoWeAre";

import OurMission from "./Screens/OurMission";
import CampaignAndOrganizing from "./Screens/WhatWeDo/CampaignAndOrganizing";
import Training from "./Screens/WhatWeDo/Training";
import ServiceProvision from "./Screens/WhatWeDo/ServiceProvision";
import DigitalHealthSHSR from "./Screens/WhatWeDo/DigitalHealthSHSR";
import Contactus from "./Screens/ContactUs";
import OurTeam from "./Screens/OurTeam";
import Advocacy from "./Screens/WhatWeDo/Advocacy";
import ScrollRestoration from "./Shared/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import News from "./Screens/News";
import Blogs from "./Screens/Blogs";
import Events from "./Screens/Events";

import HomeDashboard from "./Screens/Admin/HomeDashboard";
import Pages from "./Screens/Admin/Pages";
import BlogPage from "./Screens/Admin/BlogPage";
import EventsAdmin from "./Screens/Admin/EventsAdmin";
import AllBlogs from "./Screens/Admin/Blogs/AllBlogs";
import CreateBlog from "./Screens/Admin/Blogs/CreateBlog";
import ViewBlog from "./Screens/Admin/Blogs/ViewBlog";
import AllEvents from "./Screens/Admin/Events/AllEvents";
import CreateEvent from "./Screens/Admin/Events/CreateEvent";
import ViewEvent from "./Screens/Admin/Events/ViewEvent";
import BlogDetails from "./Screens/Blogs/BlogDetails";
import EventDetails from "./Screens/Events/EventDetails";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./Screens/Admin/ResetPassword";
import ForgotPassword from "./Screens/Admin/ForgotPassword";
import Page404 from "./Screens/ErrorPages/Page404";
import AllPages from "./Screens/Admin/Pages/AllPages";
import GeneralInfo from "./Screens/Admin/Pages/GeneralInfo";
import TeamMembers from "./Screens/Admin/Pages/TeamMembers";
import Partners from "./Screens/Admin/Pages/Partners";
import TeamMembersLayout from "./Screens/Admin/Pages/TeamMembersLayout";
import TeamMember from "./Screens/Admin/Pages/TeamMember";
import AllPartners from "./Screens/Admin/Pages/AllPartners";
import Partner from "./Screens/Admin/Pages/Partner";
import CreatePartner from "./Screens/Admin/Pages/CreatePartner";
import AdminAdvocacyPage from "./Screens/Admin/Pages/AdminAdvocacyPage";
import AdminDigitalHealth from "./Screens/Admin/Pages/AdminDigitalHealth";
import AdminContactUs from "./Screens/Admin/Pages/AdminContactUs";
import AdminCompaign from "./Screens/Admin/Pages/AdminCompaign";
import AdminTraining from "./Screens/Admin/Pages/AdminTraining";
import AdminAboutUs from "./Screens/Admin/Pages/AdminAboutUs";
import AdminOurTeam from "./Screens/Admin/Pages/AdminOurTeam";
import AdminOutlet from "./Screens/Admin/Pages/AdminOutlet";

function App() {
	return (
		<>
			<AnimatePresence mode="wait">
				<ScrollRestoration />
				<Toaster
					position="top-center"
					toastOptions={{
						duration: 5000,
					}}
				/>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<AboutUs />} />
						<Route path="whoweare" element={<WhoWeAre />} />
						<Route path="mission" element={<OurMission />} />
						<Route path="contactus" element={<Contactus />} />
						<Route path="news" element={<News />}>
							<Route index element={<Blogs />} />
							<Route path="events" element={<Events />} />
						</Route>
						<Route path="news/blogs/:refId" element={<BlogDetails />} />
						<Route path="news/events/:refId" element={<EventDetails />} />
						<Route path="ourteam" element={<OurTeam />} />
						<Route path="whatwedo/advocacy" element={<Advocacy />} />
						<Route
							path="whatwedo/campaign-organizing"
							element={<CampaignAndOrganizing />}
						/>
						<Route path="whatwedo/training" element={<Training />} />
						<Route
							path="whatwedo/service-provision"
							element={<ServiceProvision />}
						/>
						<Route
							path="whatwedo/digital-health"
							element={<DigitalHealthSHSR />}
						/>
						<Route path="whatwedo/events" element={<Events />} />
						<Route />
					</Route>
					<Route path="resetpassword/:token" element={<ResetPassword />} />
					<Route path="/admin" element={<LayoutAdmin />}>
						<Route index element={<Login />} />
						<Route path="forgotpassword" element={<ForgotPassword />} />
						<Route
							path="dashboard"
							element={<PrivateRoute element={<AdminDashboard />} />}>
							<Route index element={<HomeDashboard />} />
							<Route path="pages" element={<Pages />}>
								<Route index element={<AllPages />} />
								<Route path="advocacy" element={<AdminAdvocacyPage />} />
								{/* {<Route path="digitalinfo" element={<AdminDigitalHealth />} />} */}
								<Route path="contactus" element={<AdminContactUs />} />
								<Route path="compaign" element={<AdminCompaign />} />
								<Route path="training" element={<AdminOutlet />}>
									<Route index element={<AdminTraining />} />
								</Route>
								{/* {<Route path="aboutus" element={<AdminAboutUs />} />} */}
								<Route path="ourteam" element={<AdminOurTeam />} />
								<Route path="generalinfo" element={<GeneralInfo />} />
								<Route path="team" element={<TeamMembersLayout />}>
									<Route index element={<TeamMembers />} />
									<Route path=":id" element={<TeamMember />} />
								</Route>
								<Route path="partners" element={<Partners />}>
									<Route index element={<AllPartners />} />
									<Route path=":id" element={<Partner />} />
									<Route path="create" element={<CreatePartner />} />
								</Route>
							</Route>
							<Route path="blogs" element={<BlogPage />}>
								<Route index element={<AllBlogs />} />
								<Route path="create" element={<CreateBlog />} />
								<Route path=":refId" element={<ViewBlog />} />
							</Route>
							<Route path="events" element={<EventsAdmin />}>
								<Route index element={<AllEvents />} />
								<Route path="create" element={<CreateEvent />} />
								<Route path=":refId" element={<ViewEvent />} />
							</Route>
							{/* {<Route path="events" element={<EventsAdmin />} />} */}
						</Route>
					</Route>
					<Route path="*" element={<Page404 />} />
				</Routes>
			</AnimatePresence>
		</>
	);
}

export default App;
