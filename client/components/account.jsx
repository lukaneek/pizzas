import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Account(props) {
    const { email } = props;
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
            params: {
                email: email
            }
        })
            .then((res) => {
                setPizzas(res.data.pizzas);
                setCity(res.data.city);
                setState(res.data.state);
                setAddress(res.data.address);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    async function deleteHandler(e) {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/delete`, {
                email
            })
                .then((res) => {
                    saveEmail("");
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    async function logoutHanlder(e) {
        e.preventDefault();

        saveEmail("");
        navigate("/");
    }

    async function sumbit(e) {
        e.preventDefault();

        if (password != confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            await axios.put(`${import.meta.env.VITE_BASE_URL}/account`, {
                email, password, city, state, address
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data == "exists") {
                        navigate("/home");
                    }
                    else {
                        navigate("/");
                    }
                })
                .catch(e => {
                    alert("something went wrong");
                    console.log(e);
                })
        }
        catch (e) {
            console.log(e);
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
            <br />
            <div className="login template d-flex justify-content-start align-items-center 100-w 100-vh bg primary">
                <div style={{ paddingLeft: 50 }}>
                    <h1>Update Account Info</h1>
                    <form class action="PUT">
                        <div data-mdb-input-init class="form-outline mb-2">
                            <input type="password" placeholder="Your Password:" id="form2Example2" onChange={(e) => { setPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Password</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-2">
                            <input type="password" placeholder="Confirm Password:" id="form2Example2" onChange={(e) => { setConfirmPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Confirm Password</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" value={city} id="form2Example2" onChange={(e) => { setCity(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">City</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" value={state} id="form2Example2" onChange={(e) => { setState(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">State</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" value={address} id="form2Example2" onChange={(e) => { setAddress(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Address</label>
                        </div>
                        <div class=" d-flex justify-content-center align-items-center">
                            <div>
                                <   button type="submit" onClick={sumbit} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Update</button>
                            </div>

                            <div>
                                <   button type="submit" onClick={deleteHandler} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Delete Account</button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div>
                    <h2>Previous Orders:</h2>
                    {
                        pizzas.map((pizza, index) => (
                            <ul class="list-group-item" key={index}>
                                <h2>Pizza:</h2>
                                <li>{pizza.toppings.join(", ")}</li>
                                <li>{pizza.crust}</li>
                                <li>{pizza.size}</li>
                                <li>{pizza.method}</li>
                                <li>{pizza.quantity}</li>
                                <li>{pizza.orderDate}</li>
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div>
    )

}

export default Account;