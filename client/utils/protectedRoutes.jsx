import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
    const {email} = props;
    return email == "" ? <Navigate to={`${import.meta.env.VITE_BASE_SERVER_URL}/`}/> : <Outlet/>
}

export default ProtectedRoutes;