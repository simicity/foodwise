import { pool } from "../config/database.js"

const getUsersByFridgeId = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM fridges_users WHERE fridge_id = $1', [id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getFridgesByUserId = async (req, res) => {
    try {
        const user_id = parseInt(req.params.user_id)
        const results = await pool.query(`
            SELECT * FROM fridges
            INNER JOIN fridges_users ON fridges.id = fridges_users.fridge_id
            WHERE fridges_users.user_id = $1
        `, [user_id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const addUserToFridge = async (req, res) => {
    try {
        const { user_id } = req.body
        const fridge_id = parseInt(req.params.id)
        const results = await pool.query('INSERT INTO fridges_users (fridge_id, user_id) VALUES ($1, $2) RETURNING *', [fridge_id, user_id])
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const deleteUserFromFridge = async (req, res) => {
    try {
        const { user_id } = req.body
        const fridge_id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM fridges_users WHERE fridge_id = $1 AND user_id = $2', [fridge_id, user_id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export default {
    getUsersByFridgeId,
    getFridgesByUserId,
    addUserToFridge,
    deleteUserFromFridge
}