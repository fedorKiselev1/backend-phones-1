const db = require('../db')

class ItemController {
    async createItem(req, res) {
        const { price, name } = req.body;
        const newItem = await db.query(
            `INSERT INTO items (price, name) values ($1, $2) RETURNING *`,
            [price, name],
        );
        res.json(newItem.rows[0]);
    }
    async getItem(req, res) {
        const items = await db.query(`SELECT * FROM items`);
        res.json(items.rows);
    }
    async getOneItem(req, res) {
        const id = req.params.id;
        const item = await db.query(`SELECT * FROM items WHERE item_id = $1`, [id]);
        res.json(item.rows[0]);
    }
    async updateItem(req, res) {
        const { price, name, item_id } = req.body;
        const item = await db.query(`UPDATE items SET price = $1, name = $2 WHERE item_id = $3 RETURNING *`,
        [price, name, item_id],
        );
        res.json(item.rows[0]);
    }
    async deleteItem(req, res) {
        const id = req.params.id;
        const item = await db.query(`DELETE FROM items WHERE item_id = $1`, [id]);
        res.json(item.rows[0]);
    }
}

module.exports = new ItemController();