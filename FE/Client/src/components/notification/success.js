import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function Success({ message, className }) {
    return (
        <h5 className={('text-left', className)} style={{ color: '#37e32a' }}>
            <FontAwesomeIcon icon={faCheck} /> {message}
        </h5>
    );
}

export default Success;
