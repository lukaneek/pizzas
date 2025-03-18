import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
    const { userId } = props;
    return userId == "" ? <Navigate to={`${import.meta.env.VITE_PATH}/`} /> : <Outlet />
}

export default ProtectedRoutes;