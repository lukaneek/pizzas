import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");

    function sumbit(e) {
        e.preventDefault();

        if (!password || !confirmPassword || (password != confirmPassword)) {
            alert("Passwords don't match!");
            return;
        }

        axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/register`, {
            email, password, city, state, address, zipCode
        })
            .then(res => {
                console.log(res);
                alert(res.data + " Sending a verification email to: " + email + ". You must verify your email before placing an order.");
                navigate(`${import.meta.env.VITE_PATH}/`);
            })
            .catch(e => {
                if (e.response && e.response.status == 409) {
                    alert(e.response.data);
                }
                else if (e.response && e.response.status == 422){
                    const messages = e.response.data.map((error, index) => {
                        return error.message + "\n";
                    })
                    alert(messages);
                }
                else {
                    alert("Something went wrong registering user.  Please try again later.");
                }
                console.log(e);
            })
    }

    return (
        <div>
            <div>
                <nav class="navbar fixed-top navbar-light bg-light justify-content-center p-3 mb-2 bg-primary text-white">
                    <a class="navbar-brand" style={{ padding: 10 }} href="#">Welcome to Luka's Pizzeria!</a>
                </nav>
            </div>
            <div className="login template d-flex justify-content-center align-items-center 100-w 100-vh bg primary" >
                <div style={{ paddingTop: 100 }}>
                    <h1 class="text-center">Register</h1>
                    <form>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="email" id="form2Example1" onChange={(e) => { setEmail(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example1">Email address<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="password" id="form2Example2" onChange={(e) => { setPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Password<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="password" id="form2Example2" onChange={(e) => { setConfirmPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Confirm Password<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setAddress(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Address<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setCity(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">City<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setState(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">State<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="text" id="form2Example2" onChange={(e) => { setZipCode(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Zip Code<span style={{ color: "red" }}> *</span></label>
                        </div>

                        <div class=" d-flex justify-content-center align-items-center">
                            <   button type="submit" onClick={sumbit} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Register</button>
                        </div>
                        <div class="text-center">

                            <a href="./">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;