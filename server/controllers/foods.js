import { pool } from "../config/database.js"

const getFoodsByFridgeId = async (req, res) => {
    try {
        const fridge_id = parseInt(req.params.fridge_id)
        const { sort } = req.query
        const { order } = req.query
        // console.log("sort", sort)
        // console.log("order", order)
        if (!sort) {
            const results = await pool.query('SELECT * FROM foods WHERE fridge_id = $1', [fridge_id])
            res.status(200).json(results.rows)
        } else {
            if (!order || order === 'asc') {
                const results = await pool.query(`SELECT * FROM foods WHERE fridge_id = $1 ORDER BY ${sort} asc`, [fridge_id])
                res.status(200).json(results.rows)
            } else if (order === 'desc') {
                const results = await pool.query(`SELECT * FROM foods WHERE fridge_id = $1 ORDER BY ${sort} desc`, [fridge_id])
                res.status(200).json(results.rows)
            }
        }
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getFood = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM foods WHERE id = $1', [id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const createFoodInFridge = async (req, res) => {
    try {
        const { name, expiration_date, count, category_id } = req.body
        const fridge_id = parseInt(req.params.fridge_id)
        const results = await pool.query('INSERT INTO foods (name, expiration_date, count, fridge_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, expiration_date, count, fridge_id, category_id])
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const updateFood = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, expiration_date, count, category_id } = req.body
        const results = await pool.query('UPDATE foods SET name = $1, expiration_date = $2, count = $3, category_id = $4 WHERE id = $5 RETURNING *', [name, expiration_date, count, category_id, id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const updateFoodCount = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { count } = req.body
        const results = await pool.query('UPDATE foods SET count = $1 WHERE id = $2 RETURNING *', [count, id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const updateFoodExpirationDate = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { expiration_date } = req.body
        const results = await pool.query('UPDATE foods SET expiration_date = $1 WHERE id = $2 RETURNING *', [expiration_date, id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const updateFoodCategory = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { category_id } = req.body
        const results = await pool.query('UPDATE foods SET category_id = $1 WHERE id = $2 RETURNING *', [category_id, id])
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const deleteFood = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM foods WHERE id = $1 RETURNING *', [id])
        res.status(200).json( { message: `Food with id ${id} deleted` } )
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

export default {
    getFoodsByFridgeId,
    getFood,
    createFoodInFridge,
    updateFood,
    updateFoodCount,
    updateFoodExpirationDate,
    updateFoodCategory,
    deleteFood
}