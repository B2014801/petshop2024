import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

function Warning({ message }) {
    return (
        <>
            <h6 className="text-center py-1" style={{ backgroundColor: '#d1f4da' }}>
                <FontAwesomeIcon icon={faWarning} style={{ color: '#f7c102' }}></FontAwesomeIcon> {message}
            </h6>
        </>
    );
}

export default Warning;
