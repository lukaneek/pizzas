import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

function Home(props) {
    const navigate = useNavigate();
    const { email } = props;


    const orderHandler = () => {
        navigate(`${import.meta.env.VITE_PATH}/order`);
    }

    const previousOrderHandler = () => {
        navigate(`${import.meta.env.VITE_PATH}/previousorders`);
    }

    return (
        <div>
            <div style={{ padding: 20 }}>
                <Navbar email={email}/>
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
