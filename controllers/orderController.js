const db = require('../db')

class OrderController {
    async createOrder(req, res) {
        const { user_id, item_id } = req.body;
        const newOrder = await db.query(
            `INSERT INTO orders (user_id, item_id) values ($1, $2) RETURNING *`,
            [user_id, item_id],
        );
        res.json(newOrder.rows[0]);
    }
    async getOrder(req, res) {
        const orders = await db.query(`SELECT * FROM orders`);
        res.json(orders.rows);
    }
    async getOneOrder(req, res) {
        const id = req.params.id;
        const order = await db.query(`SELECT * FROM orders WHERE order_id = $1`, [id]);
        res.json(order.rows[0]);
    }
    async getOrderByUser(req, res) {
        const id = req.query.id;
        const orders = await db.query(`SELECT * FROM orders WHERE user_id = $1`, [id])
        res.json(orders.rows)
    }
    async updateOrder(req, res) {
        const { user_id, item_id, order_id } = req.body;
        const order = await db.query(`UPDATE orders SET user_id = $1, item_id = $2 WHERE order_id = $3 RETURNING *`,
        [user_id, item_id, order_id],
        );
        res.json(order.rows[0]);
    }
    async deleteOrder(req, res) {
        const id = req.params.id;
        const order = await db.query(`DELETE FROM orders WHERE order_id = $1`, [id]);
        res.json(order.rows[0]);
    }
}

module.exports = new OrderController();