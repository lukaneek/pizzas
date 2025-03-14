import { useLocation, useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

function Order(props) {
    const { email } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const pizzaWithIdObject = location.state;

    const [toppings, setToppings] = useState([]);
    const [crust, setCrust] = useState("thin");
    const [size, setSize] = useState("small");
    const [method, setMethod] = useState("delivery");
    const [quantity, setQuantity] = useState(1);
    const [pizza, setPizza] = useState({});
    const [onions, setOnions] = useState(false);
    const [pepperoni, setPepperoni] = useState(false);
    const [cheese, setCheese] = useState(false);
    const [sausage, setSausage] = useState(false);
    const [olives, setOlives] = useState(false);
    const [mushrooms, setMushrooms] = useState(false);
    const [pineapple, setPineapple] = useState(false);
    const [bacon, setBacon] = useState(false);
    const [anchovies, setAnchovies] = useState(false);
    const [peppers, setPeppers] = useState(false);

    useEffect(() => {
        if (pizzaWithIdObject) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
                params: {
                    email: email
                }
            })
                .then((res) => {
                    console.log("this pizza id: " + pizzaWithIdObject.pizzaId);
                    console.log(res.data.pizzas);
                    const foundPizza = res.data.pizzas.find((pizza) => { return pizza._id == pizzaWithIdObject.pizzaId; });
                    console.log(foundPizza);
                    if (foundPizza) {
                        setPizza(foundPizza);
                        setToppings(foundPizza.toppings);
                        foundPizza.toppings.forEach(topping => {
                            if (topping == "pepperoni") {
                                setPepperoni(true);
                            } else if (topping == "cheese") {
                                setCheese(true);
                            } else if (topping == "sausage") {
                                setSausage(true);
                            } else if (topping == "olives") {
                                setOlives(true);
                            } else if (topping == "peppers") {
                                setPeppers(true);
                            } else if (topping == "onions") {
                                setOnions(true);
                            } else if (topping == "mushrooms") {
                                setMushrooms(true);
                            } else if (topping == "pineapple") {
                                setPineapple(true);
                            } else if (topping == "bacon") {
                                setBacon(true);
                            } else if (topping == "anchovies") {
                                setAnchovies(true);
                            }
                        })
                        setCrust(foundPizza.crust);
                        setMethod(foundPizza.method);
                        setQuantity(foundPizza.quantity);
                        setSize(foundPizza.size);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, []);

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
        console.log(value, checked);
        if (checked) {
            setToppings(res => [...res, value]);
        }
        if (value == "pepperoni") {
            setPepperoni(checked);
        } else if (value == "cheese") {
            setCheese(checked);
        } else if (value == "sausage") {
            setSausage(checked);
        } else if (value == "olives") {
            setOlives(checked);
        } else if (value == "peppers") {
            setPeppers(checked);
        } else if (value == "onions") {
            setOnions(checked);
        } else if (value == "mushrooms") {
            setMushrooms(checked);
        } else if (value == "pineapple") {
            setPineapple(checked);
        } else if (value == "bacon") {
            setBacon(checked);
        } else if (value == "anchovies") {
            setAnchovies(checked);
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
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={pepperoni} value="pepperoni" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Pepperoni
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={cheese} value="cheese" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Cheese
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={sausage} value="sausage" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Sausage
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={olives} value="olives" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Olives
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={peppers} value="peppers" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Peppers
                            </label>
                        </div>
                    </div>
                    <div class="form-check d-flex justify-content-center">
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={onions} value="onions" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Onions
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={mushrooms} value="mushrooms" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Mushrooms
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={pineapple} value="pineapple" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Pineapple
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={bacon} value="bacon" id="defaultCheck1" />
                            <label class="form-check-label" for="defaultCheck1">
                                Bacon
                            </label>
                        </div>
                        <div style={{ paddingRight: 50 }}>
                            <input onChange={handleToppings} class="form-check-input" type="checkbox" checked={anchovies} value="anchovies" id="defaultCheck1" />
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