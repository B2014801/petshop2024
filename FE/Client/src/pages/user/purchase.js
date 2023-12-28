import { useParams } from 'react-router-dom';

function Purchase() {
    const { state } = useParams();
    return <div>purchase{state}</div>;
}

export default Purchase;
