const randToken = require('rand-token');
const bcrypt = require('bcrypt');

// const userModel = require('../users/users.models');
const authMethod = require('./auth.methods');

const jwtVariable = require('../../variables/jwt');

const AuthService = require('../../services/auth.service');
const MongoDB = require('../../utils/mongodb.util');
const ApiError = require('../../api-errors');
exports.register = async (req, res, next) => {
    const email = req.body.email.toLowerCase();

    const authService = new AuthService(MongoDB.client);
    let user = await authService.getUser(email);
    if (user) {
        return next(new ApiError(404, 'tài khoản đã tồn tại'));
    } else {
        const createUser = await authService.createUser(req.body);
        if (!createUser) {
            return res.status(400).send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
        }
        return res.send({
            email,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase() || 'test';
        const password = req.body.password || '12345';
        const OAuthtype = req.body.OAuthtype;
        const authService = new AuthService(MongoDB.client);
        let user = await authService.getUser(email);

        if (!user) {
            return res.status(401).send('Email không tồn tại.');
        }
        if (!OAuthtype) {
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).send('Mật khẩu không chính xác.');
            }
        }
        // create time survive of  tocken life
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        // scret token
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        //to save in access token
        const dataForAccessToken = {
            email: user.email,
        };
        //create accessToken
        const accessToken = await authMethod.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
        if (!accessToken) {
            return res.status(401).send('Đăng nhập không thành công, vui lòng thử lại.');
        }
        // create refresh token
        let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
        if (!user.refreshToken) {
            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            await authService.updateRefreshToken(user.email, refreshToken);
        } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            refreshToken = user.refreshToken;
        }
        user = { role: user.role, _id: user._id };
        return res.json({
            msg: 'Đăng nhập thành công.',
            accessToken,
            refreshToken,
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.refreshToken = async (req, res) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send('Không tìm thấy access token.');
    }

    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send('Không tìm thấy refresh token.');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

    // Decode access token đó
    const decoded = await authMethod.decodeToken(accessTokenFromHeader, accessTokenSecret);
    if (!decoded) {
        return res.status(400).send('Access token không hợp lệ.');
    }

    const email = decoded.payload.email; // Lấy username từ payload

    const authService = new AuthService(MongoDB.client);
    const user = await authService.getUser(email);
    if (!user) {
        return res.status(401).send('User không tồn tại.');
    }

    if (refreshTokenFromBody !== user.refreshToken) {
        return res.status(400).send('Refresh token không hợp lệ.');
        // res.send(user);
    }

    // Tạo access token mới
    const dataForAccessToken = {
        email,
    };

    const accessToken = await authMethod.generateToken(dataForAccessToken, accessTokenSecret, accessTokenLife);
    if (!accessToken) {
        return res.status(400).send('Tạo access token không thành công, vui lòng thử lại.');
    }
    return res.json({
        accessToken,
    });
};
// exports.loginWithGG = async (req, res, next) => {
//     const email = req.body.email.toLowerCase() || 'test';

//     const authService = new AuthService(MongoDB.client);
//     let user = await authService.getUser(email);
//     // if (!user) {
//     //     return res.status(401).send('Email không tồn tại.');
//     // }
//     if (req.body.isgglogin) {
//         console.log(123);
//     }
// };
