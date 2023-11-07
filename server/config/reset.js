import { pool } from './database.js'
import './dotenv.js'

const categories = ['Meat', 'Vegetables', 'Fruits', 'Dairy', 'Condiments', 'Beverages', 'Other']

const createUsersTable = async () => {
  const createUsersTableQuery = `
      DROP TABLE IF EXISTS users CASCADE;
  
      CREATE TABLE IF NOT EXISTS users (
          id serial PRIMARY KEY,
          google_id varchar(30) NOT NULL,
          username varchar(100) NOT NULL,
          avatarurl varchar(500) NOT NULL,
          accesstoken varchar(500) NOT NULL
      );
  `

  try {
    const res = await pool.query(createUsersTableQuery)
    console.log('🎉 users table created successfully')
  } catch (err) {
    console.error('⚠️ error creating users table', err)
  }
}

const createFridgesTable = async () => {
  const createFridgesTableQuery = `
    CREATE TABLE IF NOT EXISTS fridges (
      id serial PRIMARY KEY,
      user_id int NOT NULL,
      name varchar(100) NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE
    );
  `

  try {
    const res = await pool.query(createFridgesTableQuery)
    console.log('🎉 fridges table created successfully')
  } catch (err) {
    console.error('⚠️ error creating fridges table', err)
  }
}

const createFridgesUsersTable = async () => {
  const createFridgesUsersTableQuery = `
    DROP TABLE IF EXISTS fridges_users CASCADE;

    CREATE TABLE IF NOT EXISTS fridges_users (
      fridge_id int NOT NULL,
      user_id int NOT NULL,
      PRIMARY KEY (fridge_id, user_id),
      FOREIGN KEY (fridge_id) REFERENCES fridges(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `

  try {
    const res = await pool.query(createFridgesUsersTableQuery)
    console.log('🎉 fridges_users table created successfully')
  } catch (err) {
    console.error('⚠️ error creating fridges_users table', err)
  }
}

const createFoodCategoriesTable = async () => {
  const createCategoriesTableQuery = `
      CREATE TABLE IF NOT EXISTS food_categories (
          id serial PRIMARY KEY,
          name varchar(30) NOT NULL
      );
  `

  try {
    const res = await pool.query(createCategoriesTableQuery)
    console.log('🎉 food_categories table created successfully')
  } catch (err) {
    console.error('⚠️ error creating food_categories table', err)
  }
}

const seedFoodCategoriesTable = async () => {
  await createFoodCategoriesTable()

  categories.forEach((category) => {
    const insertQuery = {
      text: 'INSERT INTO food_categories (name) VALUES ($1)'
    }
  
    pool.query(insertQuery, [category], (err, res) => {
      if (err) {
          console.error('⚠️ error inserting category', err)
          return
      }
  
      console.log(`✅ ${category} added successfully`)
    })
  })
}


const createFoodsTable = async () => {
  const createFoodsTableQuery = `
    CREATE TABLE IF NOT EXISTS foods (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      added_date date NOT NULL,
      expiration_date date NOT NULL,
      count int NOT NULL,
      fridge_id int NOT NULL,
      category_id int NOT NULL,
      FOREIGN KEY (fridge_id) REFERENCES fridges(id) ON UPDATE CASCADE,
      FOREIGN KEY (category_id) REFERENCES food_categories(id) ON UPDATE CASCADE
    );
  `

  try {
    const res = await pool.query(createFoodsTableQuery)
    console.log('🎉 foods table created successfully')
  } catch (err) {
    console.error('⚠️ error creating foods table', err)
  }
}

const createShoppingItemsTable = async () => {
  const createShoppingItemsTableQuery = `
    CREATE TABLE IF NOT EXISTS shopping_items (
      id serial PRIMARY KEY,
      name varchar(100) NOT NULL,
      count int NOT NULL,
      user_id int NOT NULL,
      category_id int NOT NULL,
      fridge_id int NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE,
      FOREIGN KEY (category_id) REFERENCES food_categories(id) ON UPDATE CASCADE,
      FOREIGN KEY (fridge_id) REFERENCES fridges(id) ON UPDATE CASCADE
    );
  `

  try {
    const res = await pool.query(createShoppingItemsTableQuery)
    console.log('🎉 shopping_items table created successfully')
  } catch (err) {
    console.error('⚠️ error creating shopping_items table', err)
  }
}

const createTables = async () => {
  // await createUsersTable()
  // await createFridgesTable()
  // await createFridgesUsersTable()
  // await seedFoodCategoriesTable()
  // await createFoodsTable()
  // await createShoppingItemsTable()
}

createTables()
