import { pool } from "../config/database.js"

const getShoppingItems = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM shopping_items')
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const getShoppingItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM shopping_items WHERE id = $1', [id])
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const createShoppingItem = async (req, res) => {
    try {
        const { name, count, user_id, category_id, fridge_id } = req.body
        const results = await pool.query('INSERT INTO shopping_items (name, count, user_id, category_id, fridge_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, count, user_id, category_id, fridge_id])
        res.status(201).json(results.rows[0])
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const updateShoppingItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, count, user_id, category_id, fridge_id } = req.body
        const results = await pool.query('UPDATE shopping_items SET name = $1, count = $2, user_id = $3, category_id = $4, fridge_id = $5 WHERE id = $6 RETURNING *', [name, count, user_id, category_id, fridge_id, id])
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const updateShoppingItemName = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name } = req.body
        const results = await pool.query('UPDATE shopping_items SET name = $1 WHERE id = $2 RETURNING *', [name, id])
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const updateShoppingItemCount = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { count } = req.body
        const results = await pool.query('UPDATE shopping_items SET count = $1 WHERE id = $2 RETURNING *', [count, id])
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const updateShoppingItemCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { category_id } = req.body
        const results = await pool.query('UPDATE shopping_items SET category_id = $1 WHERE id = $2 RETURNING *', [category_id, id])
        res.status(200).json(results.rows)
    } catch (error){
        res.status(409).json( { error: error.message } )
    }
}

const deleteShoppingItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM shopping_items WHERE id = $1', [id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export default {
    getShoppingItems,
    getShoppingItem,
    createShoppingItem,
    updateShoppingItem,
    updateShoppingItemName,
    updateShoppingItemCount,
    updateShoppingItemCategory,
    deleteShoppingItem
}