import mysql from 'promise-mysql'
import { config } from './../../config'

const pool = mysql.createPool(config['db']['mysql'])

export const db = {
  query: (sql, params) => {
    return pool.query(sql, params)
  }
}