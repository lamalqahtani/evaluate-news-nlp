const path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()

//API Part
const baseURL = "https://api.meaningcloud.com/sentiment-2.1"
const API_KEY = "95c2f34c0fa48d78f8c5923b8f970fd6"

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    console.log('working')
    res.send(mockAPIResponse)
})
