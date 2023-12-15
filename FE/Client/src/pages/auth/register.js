import { useNavigate } from 'react-router-dom';

import RegisterForm from '~/components/form/registerForm';
import authService from '~/services/auth.service';

function Register() {
    const navigate = useNavigate();
    const handleRegisterUser = async (data) => {
        try {
            let result = await authService.createUser(data);
            if (result) {
                alert('Thành công');
                navigate('/');
            }
        } catch (error) {
            alert('Tài khoản tồn tại');
        }
    };
    return (
        <div>
            <RegisterForm sendUserRegisterData={handleRegisterUser} />
        </div>
    );
}

export default Register;
