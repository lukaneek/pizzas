import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
    const {email} = props;
    return email == "" ? <Navigate to={`${import.meta.env.VITE_PATH}/`}/> : <Outlet/>
}

export default ProtectedRoutes;