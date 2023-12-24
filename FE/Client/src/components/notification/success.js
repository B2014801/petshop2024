import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Success({ message }) {
    return (
        <h5 className="text-left my-2" style={{ color: '#37e32a' }}>
            <FontAwesomeIcon icon={faCheck} /> {message}
        </h5>
    );
}

export default Success;
