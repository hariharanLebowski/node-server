const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors');
const bodyparser = require('body-parser')
const expressApp = express()
const app = require("./app")
const db = require("./utils/db")
const config = require("./config");

const jsonFormat = (tokens, req, res) => {
  return JSON.stringify({
    'remote-address': tokens['remote-addr'](req, res),
    'response-time': parseFloat(tokens['response-time'](req, res)),
    'method': tokens['method'](req, res),
    'url': tokens['url'](req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': parseInt(tokens['status'](req, res)),
    'content-length': parseInt(tokens['res'](req, res, 'content-length')),
    'referrer': tokens['referrer'](req, res),
    'user-agent': tokens['user-agent'](req, res),
    'reqid': tokens['reqid'](req, res),
    'err': tokens['err'](req, res)
  });
}

const initApp = (App, db) => {
  return new Promise((resolve, reject) => {
    App.use(cors())
    morgan.token('reqid', function (req, res) { return req.user && req.user.id ? req.user.id : req.id })
    morgan.token('err', function (req, res) { return req.error })
    App.use(morgan(jsonFormat))
    App.use(helmet())
    App.use(bodyparser.json({
      limit: '2mb'
    }))

    let appObj = new app(App, db, config.app)
    App.use((err, req, res, next) => {
      try {
        req.error = err && err.message ? err.message : JSON.stringify(err);
      } catch (error) {
        req.error = ""
        err.status = 504
      }
      res.status(err && err.status ? err.status : 500).send({
        code: err && err.status ? err.status : 500,
        message: err && err.message ? err.message : err,
        data: err && err.data ? err.data : {}
      })
    }
    )
    resolve(appObj)
  })


}



db.connect(config.db).then(async db => {

    initApp(expressApp, db).then(() => {
      db.syncDb().then(() => {
        expressApp.listen(config.app.port, () => {
          console.log("server started on port", config.app.port)
          expressApp.on('close', () => {
            console.log("CLOSE_DB")
            db.close();
          })
        })
      })
      process.on('SIGINT', function () {
        console.log('service stoping')
        db.close()
      });
    })
  }).catch(err => {
    console.log(err)
  });