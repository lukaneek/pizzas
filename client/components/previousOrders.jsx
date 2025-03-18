import Navbar from "./navbar";
import PreviousOrdersTable from "./previousOrdersTable";

function PreviousOrders(props) {
    const { email } = props;
    const { userId } = props;

    return (
        <div>
            <div style={{ padding: 20 }}>
                <Navbar email={email} />
                <div>
                    <PreviousOrdersTable userId={userId} addOrderButton={true}/>
                </div>
            </div>
        </div>
    )
}

export default PreviousOrders