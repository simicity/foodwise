import { pool } from "../config/database.js"

const getUsersByFridgeId = async (req, res) => {
    try {
        const fridge_id = parseInt(req.params.id)
        const results = await pool.query(`
            SELECT * FROM users
            INNER JOIN fridges_users ON users.id = fridges_users.user_id
            WHERE fridge_id = $1`, [fridge_id])
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
        console.log(`User ${user_id} added to fridge ${fridge_id}`) 
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const addUserToFridgeByUsername = async (req, res) => {
    try {
        const { username } = req.body
        const fridge_id = parseInt(req.params.id)
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username])
        if(user.rows.length === 0) {
            res.status(409).json( { error: `User ${username} does not exist` } )
        } else {
            const user_id = user.rows[0].id
            const results = await pool.query('INSERT INTO fridges_users (fridge_id, user_id) VALUES ($1, $2) RETURNING *', [fridge_id, user_id])
            res.status(201).json(results.rows[0])
            console.log(`User ${user_id} added to fridge ${fridge_id}`)
        }
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
    addUserToFridgeByUsername,
    deleteUserFromFridge
}