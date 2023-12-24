import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const commonConfig = {
    headers: {
        Accept: 'application/json',
    },
};

export const createApiClient = (baseURL, withAuthToken = false) => {
    const api = axios.create({
        baseURL: !baseURL.startsWith('http') ? process.env.REACT_APP_PETSHOP_SERVER_BASE_URL + baseURL : baseURL,
    });

    //Add an interceptor to transform requests
    api.interceptors.request.use((config) => {
        // Check if the request data is FormData (multipart form data)
        if (config && config.data instanceof FormData) {
            // Set the appropriate content type for multipart form data
            config.headers['Content-Type'] = 'multipart/form-data';
        } else {
            // Set the content type for JSON
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    });

    // Apply common configuration
    api.defaults.headers = {
        ...api.defaults.headers,
        ...commonConfig.headers,
    };

    if (withAuthToken) {
        api.interceptors.request.use(async (config) => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.accessToken) {
                    config.headers.x_authorization = `${user.accessToken}`;
                    return config;
                } else {
                    // alert('bạn phải đăng nhập trước');
                }
            } catch (error) {
                console.log(error);
            }
        });

        api.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response && error.response.status === 401) {
                    // const module = await import('@/stores/auth.store');
                    // const { useAuthStore } = module;
                    // const auth = useAuthStore();
                    // auth.setExpired();
                }
                return Promise.reject(error);
            },
        );
    }

    return api;
};
