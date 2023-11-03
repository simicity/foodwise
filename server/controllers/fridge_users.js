import { pool } from "../config/database.js"

const getUsersByFridgeId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const result = await pool.query('SELECT * FROM fridges_users WHERE fridge_id = $1', [id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}