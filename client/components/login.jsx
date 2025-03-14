import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Login(props) {
    const { saveEmail } = props;
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function sumbit(e) {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/`, {
                email, password
            })
                .then(res => {
                    if (res.data == "exists") {
                        saveEmail(email);
                        navigate("/home");
                    }
                    else if (res.data == "nonexist") {
                        alert("incorrect information entered");
                    }
                })
                .catch(e => {
                    alert("wrong information entered");
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
                    <h1 class="text-center">Login</h1>
                    <form action="POST">

                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="email" id="form2Example1" onChange={(e) => { setEmail(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example1">Email address</label>
                        </div>


                        <div data-mdb-input-init class="form-outline mb-4">
                            <input type="password" id="form2Example2" onChange={(e) => { setPassword(e.target.value) }} class="form-control" />
                            <label class="form-label" for="form2Example2">Password</label>
                        </div>


                        <div class="row mb-4">
                            <div class="col d-flex justify-content-center">

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="form2Example31" />
                                    <label class="form-check-label" for="form2Example31"> Remember me </label>
                                </div>
                            </div>

                        </div>

                        <div class=" d-flex justify-content-center align-items-center">
                            <   button type="submit" onClick={sumbit} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Sign in</button>
                        </div>
                        <div class="text-center">

                            <a href="#!">Forgot password?</a>
                        </div>
                        <div class="text-center">
                            <p>Not a member? <a href="./register">Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;