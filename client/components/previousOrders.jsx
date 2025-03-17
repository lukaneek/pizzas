import Navbar from "./navbar";
import PreviousOrdersTable from "./previousOrdersTable";

function PreviousOrders(props) {
    const { email } = props;

    return (
        <div>
            <div style={{ padding: 20 }}>
                <Navbar email={email} />
                <div>
                    <PreviousOrdersTable email={email} addOrderButton={true}/>
                </div>
            </div>
        </div>
    )
}

export default PreviousOrders