const db = require('../db')

class UserController {
    async createUser(req, res) {
        const { login, password, email } = req.body;
        const newUser = await db.query(
            `INSERT INTO users (login, password, email) values ($1, $2, $3) RETURNING *`,
            [login, password, email],
        );
        res.json(newUser.rows[0]);
    }
    async getUser(req, res) {
        const users = await db.query(`SELECT * FROM users`);
        res.json(users.rows);
    }
    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id]);
        res.json(user.rows[0]);
    }
    async updateUser(req, res) {
        const { login, password, email, user_id } = req.body;
        const user = await db.query(`UPDATE users SET login = $1, password = $2, email = $3 WHERE user_id = $4 RETURNING *`,
        [login, password, email, user_id],
        );
        res.json(user.rows[0]);
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`DELETE FROM users WHERE user_id = $1`, [id]);
        res.json(user.rows[0]);
    }

}

module.exports = new UserController();