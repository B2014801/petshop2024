import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleSignIn = ({ onSignIn }) => {
    const responseGoogle = (response) => {
        // Handle the Google sign-in response and extract necessary data
        const { profileObj } = response;
        const formData = {
            email: profileObj.email,
            name: profileObj.name,
            img: profileObj.imageUrl,
            OAuthtype: 'gg',
        };

        // Emit the OAuth data to the parent component
        onSignIn(formData);
    };

    return (
        <div className="signup-buttons">
            <GoogleLogin
                clientId="YOUR_GOOGLE_CLIENT_ID"
                buttonText="Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle} // You can handle failures separately if needed
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleSignIn;
