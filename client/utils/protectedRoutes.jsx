import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
    const {email} = props;
    return email == "" ? <Navigate to='/'/> : <Outlet/>
}

export default ProtectedRoutes;