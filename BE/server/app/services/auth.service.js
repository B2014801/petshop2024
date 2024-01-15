const { SALT_ROUNDS } = require('../variables/auth');
const bcrypt = require('bcrypt');
class AuthService {
    constructor(client) {
        this.User = client.db().collection('users');
    }
    extractUserData(payload) {
        const user = {
            name: payload.name,
            email: payload.email,
            password: payload.password ? bcrypt.hashSync(payload.password, SALT_ROUNDS) : '',
            phone: payload.phone,
            role: 'user',
            img: payload.OAuthtype ? payload.img : process.env.SERVER_LINK_USER_IMG + 'defaultuser.jpg',
            address: payload.address,
            type: 'OAuthgg',
        };
        // Remove undefined fields
        Object.keys(user).forEach((key) => user[key] === undefined && delete user[key]);
        return user;
    }
    async getUser(email) {
        try {
            const data = await this.User.findOne({ email: email });
            return data;
        } catch {
            return null;
        }
    }

    async createUser(user) {
        try {
            let data = this.extractUserData(user);
            await this.User.insertOne(data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateRefreshToken(email, refreshToken) {
        try {
            const updatedUser = await this.User.findOneAndUpdate(
                { email: email },
                { $set: { refreshToken: refreshToken } },
                { new: true },
            );

            if (updatedUser) {
                return true; // Return true if user is found and updated
            } else {
                return false; // Return false if user is not found
            }
        } catch (error) {
            console.error('Error updating refresh token:', error);
            return false; // Return false on error
        }
    }
}
module.exports = AuthService;
