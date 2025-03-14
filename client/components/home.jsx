import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Home(props) {
    const navigate = useNavigate();
    const { email } = props;

    
    const orderHandler = () => {
        navigate("/order");
    }

    const previousOrderHandler = () => {
        navigate("/previousorders");
    }

    async function logoutHanlder(e) {
        e.preventDefault();

        saveEmail("");
        navigate("/");
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
                                <NavLink to="/home" class="nav-link">Home</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/order" class="nav-link">Orders</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/account" class="nav-link">Account</NavLink>
                            </li>
                            <li class="nav-item">
                                <a onClick={logoutHanlder} class="nav-link">Log Out</a>
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
