import { pool } from "../config/database.js"

const getFridges = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM fridges')
    res.status(200).json(results.rows)
  } catch (error){
    res.status(409).json( { error: error.message } )
    console.log("Failed to get fridges, error: ", error)
  }
}

const getFridge = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('SELECT * FROM fridges WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (error){
    res.status(409).json( { error: error.message } )
    console.log("Failed to get fridge, error: ", error)
  }
}

const createFridge = async (req, res) => {
  try {
    const { name, user_id } = req.body
    const results = await pool.query('INSERT INTO fridges (name, user_id) VALUES ($1, $2) RETURNING *', [name, user_id])
    res.status(201).json(results.rows[0])
    console.log("Fridge created successfully")

    // Add creator to fridge
    const fridge_id = results.rows[0].id
    await pool.query('INSERT INTO fridges_users (fridge_id, user_id) VALUES ($1, $2) RETURNING *', [fridge_id, user_id])
    console.log("Added creator to fridge")
    
  } catch (error){
    res.status(409).json( { error: error.message } )
    console.log("Failed to create fridge, error: ", error)
  }
}

const updateFridge = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name } = req.body
    const results = await pool.query('UPDATE fridges SET name = $1 WHERE id = $2 RETURNING *', [name, id])
    res.status(200).json(results.rows[0])
    console.log("Fridge updated successfully")
  } catch (error){
    res.status(409).json( { error: error.message } )
    console.log("Failed to update fridge, error: ", error)
  }
}

const deleteFridge = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM fridges WHERE id = $1', [id])
    res.status(200).json(results.rows)
    console.log("Fridge deleted successfully")
  } catch (error) {
    res.status(409).json( { error: error.message } )
    console.log(error)
    console.log("Failed to delete fridge, error: ", error)
  }
}

export default {
  getFridges,
  getFridge,
  createFridge,
  updateFridge,
  deleteFridge
}