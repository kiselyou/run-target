import mysql from 'promise-mysql'
import { config } from './../../config'

const pool = mysql.createPool(config['db']['mysql'])

class MySQL {
  query(sql, params) {
    return pool.query(sql, params)
  }

  async findOne (sql, params) {
    const res = await pool.query(sql, params)
    return res.length > 0 ? res[0] : null
  }
}

export const db = new MySQL()