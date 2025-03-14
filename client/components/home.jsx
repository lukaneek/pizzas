import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function Home(props) {
    const navigate = useNavigate();
    const { email } = props;
    const { setEmail } = props;


    const orderHandler = () => {
        navigate(`${import.meta.env.VITE_PATH}/order`);
    }

    const previousOrderHandler = () => {
        navigate(`${import.meta.env.VITE_PATH}/previousorders`);
    }

    async function logoutHandler(e) {
        e.preventDefault();

        setEmail("", () => {
            console.log("set email in callback funtion navigate to: ");
            navigate(`${import.meta.env.VITE_PATH}/sadds`);
        });
        //navigate(`${import.meta.env.VITE_PATH}/`);
    }

    return (
        <div>
            <div style={{ padding: 20 }}>
                <nav class="navbar navbar-expand-lg navbar-light text-black">
                    <a class="navbar-brand">Welcome {email}</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <NavLink to={`${import.meta.env.VITE_PATH}/home`} class="nav-link">Home</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to={`${import.meta.env.VITE_PATH}/order`} class="nav-link">Orders</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to={`${import.meta.env.VITE_PATH}/account`} class="nav-link">Account</NavLink>
                            </li>
                            <li class="nav-item">
                                <button onClick={logoutHandler} class="nav-link">Log Out</button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div>
                    <div style={{ paddingTop: 40 }}>
                        <h1 class="d-flex justify-content-center">Options</h1>
                    </div>

                    <div class="d-flex justify-content-evenly mx-auto w-75 p-3">
                        <div style={{ width: 200 }}>
                            <h1>New Order</h1>
                            <p>Order one of our fresh, hot and ready delitious pizzas! Pick from multible different toppings, sizes, crusts.  Guaranteed to be there in 30 miniutes or your money back!</p>
                            <button type="submit" onClick={orderHandler} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4 align-items-center">Order</button>
                        </div>
                        <div style={{ width: 200 }}>
                            <h1>Previous Orders</h1>
                            <p>Chose from one of your previous orders.</p>
                            <button type="submit" onClick={previousOrderHandler} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4 align-items-center">Previous Orders</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
