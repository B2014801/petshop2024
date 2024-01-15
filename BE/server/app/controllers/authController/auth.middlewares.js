const AuthService = require('../../services/auth.service');
const jwtVariable = require('../../variables/jwt');
const authMethod = require('./auth.methods');
const MongoDB = require('../../utils/mongodb.util');
exports.isAuth = async (req, res, next) => {
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization;
    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
    // kiểm tra accestoken giống với mã secret do admin tạo ra
    const verified = await authMethod.verifyToken(accessTokenFromHeader, accessTokenSecret);
    if (!verified) {
        return res.status(401).send('access token sai hoặc đã hết hạn hết hạn');
    }
    const authService = new AuthService(MongoDB.client);
    const user = await authService.getUser(verified.payload.email);
    req.user = user;

    return next();
};
