
class IndexedDB {
  /**
   *
   * @param {string|?} [dbName]
   * @param {number|?} [version]
   */
  constructor(dbName, version) {
    /**
     *
     * @type {string}
     */
    this.dbName = dbName || 'default'

    /**
     *
     * @type {number}
     */
    this.version = version || 1
  }

  /**
   * @typedef {Object} Index
   * @property {string} column
   * @property {boolean} unique
   * @property {string} indexName
   */

  /**
   * @typedef {Object} TableOptions
   * @property {boolean} autoIncrement
   * @property {string} keyPath
   */

  /**
   * Создает таблицу в БД если она не создана.
   *
   * @param {string} tableName
   * @param {boolean} [autoIncrement]
   * @param {string|Array|?} [keyPath]
   * @param {Array.<Index>} [indexes]
   * @returns {IndexedDB}
   */
  createTable(tableName, autoIncrement = true, keyPath = null, indexes = []) {
    const request = indexedDB.open(this.dbName, this.version)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      const options = { keyPath: keyPath, autoIncrement }
      const store = db.createObjectStore(tableName, options)
      for (const index of indexes) {
        store.createIndex(index.indexName, index.column, { unique: index.unique || false })
      }
    }
    return this
  }

  /**
   * Добавлет одну запись.
   *
   * @param {string} tableName
   * @param {Array|Object|string|number|boolean} data
   * @returns {Promise<number>}
   */
  async saveOne(tableName, data) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    return this.write(store, data)
  }

  /**
   * Добавляет много записей.
   *
   * @param {string} tableName
   * @param {Array.<Array|Object|string|number|boolean>} arrayData
   * @returns {Promise<Array.<number>>}
   */
  async saveMany(tableName, arrayData) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    const promises = []
    for (const data of arrayData) {
      promises.push(this.write(store, data))
    }
    return Promise.all(promises)
  }

  /**
   * Вставляет запись в таблицу.
   *
   * @param {IDBObjectStore} store
   * @param {Array|Object|string|number|boolean} data
   * @returns  {Promise.<number>}
   */
  write(store, data) {
    return new Promise((resolve, reject) => {
      const request = store.add(data)
      request.onsuccess = (event) => {
        resolve(event.target.result)
      }
      request.onerror = reject
    })
  }

  /**
   * Удаление одной записи по ключу.
   *
   * @param {string} tableName
   * @param {string|number} key
   * @returns {Promise<void>}
   */
  async removeOne(tableName, key) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    return this.remove(store, key)
  }

  /**
   * Удаление нескольких записей по клюам.
   *
   * @param {string} tableName
   * @param {Array} keys
   * @returns {Promise<void>}
   */
  async removeMany(tableName, keys) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    const promises = []
    for (const key of keys) {
      promises.push(this.remove(store, key))
    }
    return Promise.all(promises)
  }

  /**
   * Удаление одной записи по ключу.
   *
   * @param {string} tableName
   * @param {string} indexName
   * @param {string} indexValue
   * @returns {Promise<void>}
   */
  async removeByIndex(tableName, indexName, indexValue) {
    const keys = await this.asyncGetKeysByIndex(tableName, indexName, indexValue)
    return this.removeMany(tableName, keys)
  }

  /**
   * Получение ключей по индексу.
   *
   * @param {string} tableName
   * @param {string} indexName
   * @param {string} indexValue
   * @returns {Promise<Array>}
   */
  async asyncGetKeysByIndex(tableName, indexName, indexValue) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    return new Promise((resolve, reject) => {
      const request = store.index(indexName).getAllKeys(indexValue)
      request.onsuccess = (event) => {
        resolve(event.target.result || [])
      }
      request.onerror = reject
    })
  }

  /**
   *
   * @param {IDBObjectStore} store
   * @param {number|string} key
   * @returns {Promise<Event>}
   */
  async remove(store, key) {
    return new Promise((resolve, reject) => {
      const request = store.delete(key)
      request.onsuccess = resolve
      request.onerror = reject
    })
  }

  /**
   * Получение одной записи по ключу.
   *
   * @param {string} tableName
   * @param {string|number} key
   * @returns {Promise<void>}
   */
  async getOne(tableName, key) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    return this.get(store, key)
  }

  /**
   * Получение нескольких записей по клюам.
   *
   * @param {string} tableName
   * @param {Array} keys
   * @returns {Promise<void>}
   */
  async getMany(tableName, keys) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    const promises = []
    for (const key of keys) {
      promises.push(this.get(store, key))
    }
    return Promise.all(promises)
      .then((items) => {
        return items.filter((item) => item)
      })
  }

  /**
   *
   * @param {IDBObjectStore} store
   * @param {number|string} key
   * @returns {Promise<Event>}
   */
  async get(store, key) {
    return new Promise((resolve, reject) => {
      const request = store.get(key)
      request.onsuccess = (event) => {
        resolve(event.target.result)
      }
      request.onerror = reject
    })
  }

  /**
   * Получение записей по индексу.
   *
   * @param {string} tableName
   * @param {string} indexName
   * @param {string} indexValue
   * @returns {Promise<Array>}
   */
  async getByIndex(tableName, indexName, indexValue) {
    const db = await this.connect()
    const store = this.store(db, tableName, 'readwrite')
    return new Promise((resolve, reject) => {
      const request = store.index(indexName).getAll(indexValue)
      request.onsuccess = (event) => {
        resolve(event.target.result)
      }
      request.onerror = reject
    })
  }

  /**
   * Получение одной записи по индексу.
   *
   * @param {string} tableName
   * @param {string} indexName
   * @param {string} indexValue
   * @returns {Promise<Array|Object|string|number|boolean>}
   */
  async getOneByIndex(tableName, indexName, indexValue) {
    const response = await this.getByIndex(tableName, indexName, indexValue)
    return response.length > 0 ? response[0] : null
  }

  /**
   * Открывает доступ к ткаблице.
   *
   * @param {IDBDatabase} db
   * @param {string} tableName
   * @param {string} mode
   * @returns {IDBObjectStore}
   */
  store(db, tableName, mode) {
    const transaction = db.transaction(tableName, mode)
    return transaction.objectStore(tableName)
  }

  /**
   * Открывает соединение с БД браузера.
   *
   * @returns {Promise<IDBDatabase>}
   */
  connect() {
    const request = indexedDB.open(this.dbName, this.version)
    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => {
        resolve(e.target.result)
      }
      request.onerror = reject
    })
  }
}

export default IndexedDB