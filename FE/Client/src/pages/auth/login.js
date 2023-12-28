import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '~/components/form';
import { login, setExpired } from '~/stores/auth.store';
import AuthService from '~/services/auth.service';
import { useState } from 'react';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [wrongEmailOrPass, setWrongEmailOrPass] = useState(false);

    const handleLogin = async (data) => {
        try {
            const response = await AuthService.login(data);
            if (!response.accessToken) {
                this.logout();
                throw new Error('Whoops, no access token found!');
            } else {
                dispatch(login(response));

                localStorage.setItem('user', JSON.stringify(response));
                dispatch(setExpired(false));

                navigate('/');
            }
            // console.log(result);
        } catch (error) {
            setWrongEmailOrPass(true);
        }
    };
    return (
        <div>
            <LoginForm sendUserData={handleLogin} wrongEmailOrPass={wrongEmailOrPass} />
        </div>
    );
}

export default Login;
