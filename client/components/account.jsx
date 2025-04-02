import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import PreviousOrdersTable from "./previousOrdersTable";

function Account(props) {
    const { userId, email } = props;
    const navigate = useNavigate();


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/user`, {
            params: {
                userId: userId
            }
        })
            .then((res) => {
                setPizzas(res.data.pizzas);
                setCity(res.data.city);
                setState(res.data.state);
                setAddress(res.data.address);
                setZipCode(res.data.zipCode);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    function deleteHandler(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete your account?")) {
            axios.post(`${import.meta.env.VITE_BASE_SERVER_URL}/delete`, {
                userId
            })
                .then((res) => {
                    console.log(res);
                    alert(res.data);
                    navigate(`${import.meta.env.VITE_PATH}/`);
                })
                .catch((e) => {
                    alert("Something went wrong deleting your account.  Please try again later.");
                    console.log(e);
                })
        }
    }

    function sumbit(e) {
        e.preventDefault();

        if (password != confirmPassword) {
            alert("Passwords don't match!");
            return;
        }


        axios.put(`${import.meta.env.VITE_BASE_SERVER_URL}/account`, {
            userId, password, city, state, address, zipCode
        })
            .then(res => {
                console.log(res);
                alert("Successfully updated the account!");
                navigate(`${import.meta.env.VITE_PATH}/home`);
            })
            .catch(e => {
                if (e.response && e.response.status == 422) {
                    const messages = e.response.data.map((error, index) => {
                        return error.message + "\n";
                    })
                    alert(messages);
                }
                else {
                    alert("Something went wrong updating your account.  Please try again later.");
                }
                console.log(e);
            })
    }

    return (
        <div>
            <div style={{ padding: 20 }}>
                <Navbar email={email} />

                <div className="login template d-flex justify-content-center align-items-center 100-w 100-vh bg primary">
                    <div style={{ paddingTop: 50 }}>
                        <h1>Update Account Info</h1>
                        <form>
                            <div data-mdb-input-init class="form-outline mb-2">
                                <input type="password" placeholder="New Password:" id="form2Example2" onChange={(e) => { setPassword(e.target.value) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Change Password</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-2">
                                <input type="password" placeholder="Confirm Password:" id="form2Example2" onChange={(e) => { setConfirmPassword(e.target.value) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Confirm Password</label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" value={address} id="form2Example2" onChange={(e) => { setAddress(e.target.value) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Address<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" value={city} id="form2Example2" onChange={(e) => { setCity(e.target.value) }} class="form-control" />
                                <label class="form-label" for="form2Example2">City<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" value={state} id="form2Example2" onChange={(e) => { setState(e.target.value) }} class="form-control" />
                                <label class="form-label" for="form2Example2">State<span style={{ color: "red" }}> *</span></label>
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" value={zipCode} id="form2Example2" onChange={(e) => { setZipCode(e.target.value) }} class="form-control" />
                                <label class="form-label" for="form2Example2">Zip Code<span style={{ color: "red" }}> *</span></label>
                            </div>
                            <div class=" d-flex justify-content-center align-items-center">
                                <div>
                                    <button style={{ marginRight: 20 }} type="submit" onClick={sumbit} data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4">Update</button>
                                </div>

                                <div>
                                    <button type="submit" onClick={deleteHandler} data-mdb-button-init data-mdb-ripple-init class="btn btn-danger btn-block mb-4">Delete Account</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <PreviousOrdersTable userId={userId} addOrderButton={false} />
            </div>
        </div>
    )

}

export default Account;