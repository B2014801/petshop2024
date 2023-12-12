import { useParams } from 'react-router-dom';

function Cart() {
    const ud = useParams();
    console.log(ud);
    return <div>Cart</div>;
}
export default Cart;
