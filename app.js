var express = require('express')
var http = require('http')
var https = require('https')
var path = require('path')
var fs = require('fs-extra')
var colors = require('colors')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var cookiesParser = require('cookie-parser')
var session = require('express-session')
var errorHandler = require('errorhandler')
var config = require('./config')
var app = express()
    //ssl file and passphrase us for server
var ssl_options = {
    key: null,
    cert: null
}
var compress = require('compression')
app.use(compress({
    threshold: 0, //or whatever you want the lower threshold to be
    filter: function(req, res) {
        var ct = res.get('content-type')
        return true
    }
}))

//all environment
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger(config.env))
app.use(bodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.set(process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0')
app.set('port', process.env.port || config.port)
app.use(methodOverride())
app.use(cookiesParser('02fnvnwt43fgj93fqmkkkk'))
app.use(session({
    secret: '3a96a546-f7d2-4e14-a3a7-75ad4c041cbd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(__dirname + '/public'))
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})
if (config.env === 'dev') {
    app.use(errorHandler())
}
if (process.argv.indexOf('--nossl') !== -1) {
    https.createServer(ssl_options, app).listen(config.port, function() {
        console.log('================ Sportsbook running on port '.green, config.port.toString().red.bold.underline, '================'.green)
    })
} else {
    http.createServer(app).listen(config.port, function() {
        console.log('================ Sportsbook running on port '.green, config.port.toString().red.bold.underline, '================'.green)
    })
}
