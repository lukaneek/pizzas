import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PreviousOrders(props) {
    const { email } = props;

    const [ pizzas, setPizzas ] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/user`, {
            params: {
                email: email
            }
        })
        .then((res) => {
            setPizzas(res.data.pizzas);
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    function orderAgainHandler(pizzaId) {
        navigate("./order", { state: { pizzaId: pizzaId }});
    }

    return (
        <>
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
                            <button onClick={() => orderAgainHandler(pizza._id)}>Order Again</button>
                        </ul>
                    ))
                }
            </div>
        </>
    )
}

export default PreviousOrders