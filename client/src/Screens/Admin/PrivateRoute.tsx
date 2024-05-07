//jshint esversion:9
// import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface props {
	element: ReactNode;
}
const PrivateRoute = ({ element }: props) => {
	// const { user } = useUser();

	// Redirect to login if user is not authenticated
	// if (!user) {
	// 	return <Navigate to="dashboard" />;
	// }

	return element;
};
export default PrivateRoute;
