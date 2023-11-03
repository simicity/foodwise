import { pool } from "../config/database.js"

const getFridges = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM fridges')
    res.status(200).json(results.rows)
  } catch (error){
    res.status(409).json( { error: error.message } )
  }
}

const getFridge = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM fridges WHERE id = $1', [id])
    res.status(200).json(results.rows)
  } catch (error){
    res.status(409).json( { error: error.message } )
  }
}

const createFridge = async (req, res) => {
  try {
    const { name } = req.body
    const user_id = parseInt(req.params.user_id)
    const results = await pool.query('INSERT INTO fridges (name, user_id) VALUES ($1, $2) RETURNING *', [name, user_id])
    res.status(201).json(results.rows)
  } catch (error){
    res.status(409).json( { error: error.message } )
  }
}

const updateFridge = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name } = req.body
    const results = await pool.query('UPDATE fridges SET name = $1 WHERE id = $2 RETURNING *', [name, id])
    res.status(200).json(results.rows)
  } catch (error){
    res.status(409).json( { error: error.message } )
  }
}

const deleteFridge = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM fridges WHERE id = $1', [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
  getFridges,
  getFridge,
  createFridge,
  updateFridge,
  deleteFridge
}