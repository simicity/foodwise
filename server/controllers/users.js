import { pool } from "../config/database.js"

const getUsers = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM users')
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const getUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const email = req.params.email
        const results = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const createUser = async (req, res) => {
    try {
        const { google_id, username, avatarurl, accesstoken } = req.body
        const results = await pool.query('INSERT INTO users (google_id, username, avatarurl, accesstoken) VALUES ($1, $2, $3, $4) RETURNING *', [google_id, username, avatarurl, accesstoken])
        res.status(201).json(results.rows[0])
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { username, email, avatarurl } = req.body
        const results = await pool.query('UPDATE users SET username = $1, email=$2, avatarurl = $3 WHERE id = $4 RETURNING *', [username, email, avatarurl, id])
        res.status(200).json(results.rows[0])
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM users WHERE id = $1', [id])
        res.status(200).json( { message: `User with id ${id} deleted`} )
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export default {
    getUsers,
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}