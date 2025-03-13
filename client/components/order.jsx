import { useLocation, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Order(props) {
    const { email } = props;
    const { saveEmail } = props;
    const navigate = useNavigate();

    const [toppings, setToppings] = useState([]);
    const [crust, setCrust] = useState("thin");
    const [size, setSize] = useState("small");
    const [method, setMethod] = useState("delivery");
    const [quantity, setQuantity] = useState(1);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("inside submit handler: " + email);
        axios.post(`${import.meta.env.VITE_BASE_URL}/order`, {
            toppings,
            crust,
            size,
            method,
            quantity,
            email
        })
            .then(res => {
                console.log(res);
                navigate("/account")
            })
            .catch(err => {
                console.log(err);
            })
    }

    async function logoutHanlder(e) {
        e.preventDefault();

        saveEmail("");
        navigate("/");
    }

    const handleMethod = (e) => {
        setMethod(e.target.value);
    }

    const handleSize = (e) => {
        setSize(e.target.value);
    }

    const handleCrust = (e) => {
        setCrust(e.target.value);
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleToppings = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setToppings(res => [...res, value]);
        }
    }

    return (
        <div>
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
                <div>
                    <h1 class="d-flex align-items-center justify-content-center">New Order</h1>
                </div>
                <form>
                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-10">
                            <label for="inputState">Method</label>
                            <select onChange={handleMethod} value={method} id="inputState" class="form-control">
                                <option value="delivery" selected>Delivery</option>
                                <option value="pick-up" >Pick-up</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row d-flex justify-content-center">
                        <div class="form-group col-md-4">
                            <label for="inputState">Size</label>
                            <select onChange={handleSize} value={size} id="inputState" class="form-control">
                                <option value="small" selected>Small</option>
                                <option value="medium" >Medium</option>
                                <option value="large" >Large</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">Crust</label>
                            <select onChange={handleCrust} value={crust} id="inputState" class="form-control">
                                <option value="thin" selected>Thin</option>
                                <option value="thick">Thick</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputState">QTY</label>
                            <select onChange={handleQuantity} value={quantity} id="inputState" class="form-control">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                    </div>
                    <h3 style={{ paddingTop: 50 }} class="d-flex justify-content-center">Toppings</h3>
                    <div style={{ paddingTop: 50 }} class="form-check d-flex justify-content-center">
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="pepperoni" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Pepperoni
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="cheese" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Cheese
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="sausage" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Sausage
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="olives" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Olives
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="peppers" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Peppers
                            </label>
                        </div>
                    </div>
                    <div class="form-check d-flex justify-content-center">
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="onions" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Onions
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="mushrooms" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Mushrooms
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="pineapple" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Pineapple
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="bacon" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Bacon
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" value="anchovies" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Anchovies
                            </label>
                        </div>
                    </div>

                    <div style={{ paddingTop: 50 }} class="d-flex justify-content-center align-items-center">
                        <button type="submit" onClick={submitHandler} class="btn btn-primary d-flex justify-content-center align-items-center">New Order</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Order;