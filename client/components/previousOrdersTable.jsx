import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function PreviousOrdersTable(props) {
    const { addOrderButton } = props;
    const { userId } = props;

    const [pizzas, setPizzas] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_SERVER_URL}/user`, {
            params: {
                userId: userId
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
        navigate(`${import.meta.env.VITE_PATH}/order`, { state: { pizzaId: pizzaId } });
    }


    return (
        <div class="d-flex justify-content-center">
            <div style={{ paddingTop: 50 }}>
                <h2>Previous Orders</h2>
                <table style={{ width: 1500 }} class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ordered On</th>
                            <th scope="col">Toppings</th>
                            <th scope="col">Crust</th>
                            <th scope="col">Size</th>
                            <th scope="col">Method</th>
                            <th scope="col">Quantity</th>
                            {
                                addOrderButton ? <th scope="col">Order Again</th> : ""
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            pizzas.map((pizza, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{pizza.orderDate.substring(0, 10)}</td>
                                    <td>{pizza.toppings.join(", ")}</td>
                                    <td>{pizza.crust}</td>
                                    <td>{pizza.size}</td>
                                    <td>{pizza.method}</td>
                                    <td>{pizza.quantity}</td>
                                    {
                                        addOrderButton ? <td><button class="btn btn-primary" onClick={() => orderAgainHandler(pizza._id)}>Order Again</button></td> : ""
                                    }
                                </tr>
                            ))
                        }



                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PreviousOrdersTable;