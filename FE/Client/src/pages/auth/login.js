import { useDispatch, useSelector } from 'react-redux';

import { LoginForm } from '~/components/form';
import { login, setExpired } from '~/stores/auth.store';
import AuthService from '~/services/auth.service';

function Login() {
    const dispatch = useDispatch();
    const user = useSelector((data) => data.auth.user);

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

                console.log(user);
            }
            // console.log(result);
        } catch (error) {}
    };
    return (
        <div>
            <LoginForm sendUserData={handleLogin} />
        </div>
    );
}

export default Login;
