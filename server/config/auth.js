import { pool } from './database.js'
import GoogleStrategy from 'passport-google-oauth20'

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' ? 'https://foodwise-server.up.railway.app/auth/google/callback' : 'http://localhost:3001/auth/google/callback'
}

const verify = async (accessToken, refreshToken, profile, callback) => {
  const { _json: { sub, name, picture } } = profile
  const userData = {
    google_id: sub,
    username: name,
    avatar_url: picture,
    accessToken
  }

  try {
    const results = await pool.query('SELECT * FROM users WHERE username = $1', [userData.username])
    const user = results.rows[0]

    if (!user) {
      const results = await pool.query(
          `INSERT INTO users (google_id, username, avatarurl, accesstoken)
          VALUES($1, $2, $3, $4)
          RETURNING *`,
          [userData.google_id, userData.username, userData.avatar_url, accessToken]
      )
  
      const newUser = results.rows[0]
  
      return callback(null, newUser)
    }

    return callback(null, user)
  } catch (error) {
    return callback(error)
  }
}

export const GoogleOauth20 = new GoogleStrategy(options, verify)