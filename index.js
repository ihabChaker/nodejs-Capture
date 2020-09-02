const express = require('express')
const app = express()
const dataStore = require('nedb')
const { request, response } = require('express')
app.use(express.static('public'))

const db = new dataStore('database.db')
db.loadDatabase()
db.insert({ a: 1, b: 2 })
app.listen(4000, () => { console.log('listening on port 4000') })
app.use(express.json({ limit: '1mb' }))
app.post('/api', (request, response) => {
     console.log('i got a request')
     const data = request.body
     data.timestamp = Date.now()
     db.insert(data)

})
app.get('/api', (request, response) => {
     db.find({}, (err, data) => {
          response.send(data)
     })
})