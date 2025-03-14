import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props) {
    const { saveEmail } = props;
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function sumbit(e) {
        e.preventDefault();

        if (password != confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/register`, {
                email, password, city, state, address
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data == "exists") {
                        alert("account already exists with this email");
                    }
                    else if (res.data == "nonexist") {
                        saveEmail(email);
                        navigate("./home");
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
            <div>
                <nav class="navbar fixed-top navbar-light bg-light justify-content-center p-3 mb-2 bg-primary text-white">
                    <a class="navbar-brand" style={{ padding: 10 }} href="#">Welcome to Luka's Pizzeria!</a>
                </nav>
            </div>
            <div className="login template d-flex justify-content-center align-items-center 100-w 100-vh bg primary" >
                <div style={{ paddingTop: 200 }}>
                    <h1 class="text-center">Register</h1>
                    <form action="POST">

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="email" id="form2Example1" onChange={(e) => { setEmail(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example1">Email address</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="password" id="form2Example2" onChange={(e) => { setPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Password</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="password" id="form2Example2" onChange={(e) => { setConfirmPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Confirm Password</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setCity(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">City</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setState(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">State</label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setAddress(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Address</label>
                        </div>

                        <div class=" d-flex justify-content-center align-items-center">
                            <   button type="submit" onClick={sumbit} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Regsiter</button>
                        </div>
                        <div class="text-center">

                            <a href="/">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;