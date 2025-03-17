import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
    const { email } = props;
    const navigate = useNavigate();

    function logoutHandler(e) {
        e.preventDefault();

        navigate(`${import.meta.env.VITE_PATH}/`);
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light text-black justify-content-between">
            <a class="navbar-brand">Welcome {email}</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link"><NavLink to={`${import.meta.env.VITE_PATH}/home`} style={{ textDecoration: "none", color: "gray" }}>Home</NavLink></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><NavLink to={`${import.meta.env.VITE_PATH}/order`} style={{ textDecoration: "none", color: "gray" }}>Order</NavLink></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><NavLink to={`${import.meta.env.VITE_PATH}/account`} style={{ textDecoration: "none", color: "gray" }}>Account</NavLink></a>
                    </li>
                    <li class="nav-item">
                        <a onClick={logoutHandler} class="nav-link">Log Out</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;