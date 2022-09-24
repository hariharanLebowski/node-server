const mongoose = require('mongoose');
const { Op, Sequelize } = require('sequelize');


const connect = (dbConfig) => {
    return new Promise((resolve, reject) => {

        if (dbConfig.type.toUpperCase() == "MONGO") {
            // uri:"mongodb://localhost:27017/test"
            mongoose.connect(`mongodb://${dbConfig.server}/${dbConfig.dbname}`, {
                autoIndex: true, // Don't build indexes
                serverSelectionTimeoutMS: dbConfig.pool.idle, // Keep trying to send operations for 5 seconds
                connectTimeoutMS: dbConfig.pool.idle,
                socketTimeoutMS: dbConfig.pool.acquire, // Close sockets after 45 seconds of inactivity
                family: dbConfig.options.family,
                autoCreate: dbConfig.options.autoCreate
            })
                .then(db => {
                    db.DATA_TYPE = mongoose.Schema.Types
                    db.Schema = mongoose.Schema
                    db.defaultFields = {}
                    db.define = (name, fields, options) => {
                        return db.model(name, mongoose.Schema(fields, options))
                    } 
                    db.syncDb =()=>{
                     return new Promise((resolve,reject)=>{
                         resolve({})
                     })
                    } 
                    resolve(db)
                }).catch(reject)
        }
        else if (dbConfig.type.toUpperCase() == "MYSQL") {
            const sqlize = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, {
                host: dbConfig.options.server,
                dialect: dbConfig.type,
                replication: dbConfig.options.replication,
                pool: dbConfig.pool,
                operatorsAliases: {
                    $gt: Op.gt,
                    $or: Op.or,
                    $like: Op.like,
                    $and: Op.and,
                    $eq: Op.eq,
                    $ne: Op.ne,
                    $is: Op.is,
                    $not: Op.not,
                    $col: Op.col,
                    $gte: Op.gte,
                    $lt: Op.lt,
                    $lte: Op.lte,
                    $between: Op.between,
                    $notBetween: Op.notBetween,
                    $all: Op.all,
                    $in: Op.in,
                    $notIn: Op.notIn,
                    $notLike: Op.notLike,
                    $startsWith: Op.startsWith,
                    $endsWith: Op.endsWith,
                    $substring: Op.substring,
                    $iLike: Op.iLike,
                    $notILike: Op.notILike,
                    $regexp: Op.regexp,
                    $notRegexp: Op.notRegexp,
                    $iRegexp: Op.iRegexp,
                    $notIRegexp: Op.notIRegexp,
                    $any: Op.any
                },
                dialectOptions: {
                    // Required for Google Cloud Generation 2 Instances
                    socketPath: dbConfig.options.sockPath && dbConfig.options.sockPath.length > 0 ? dbConfig.options.sockPath : '',
                    // ssl : {
                    //     rejectUnauthorized: options.encrypt !== ""?true:false,
                    // }
                },
                define: {
                    charset: 'utf8',
                    dialectOptions: {
                        collate: 'utf8_general_ci'
                    },
                    defaultScope: {
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                }
            });

            if (!dbConfig.options.logging)
                sqlize.options.logging = () => { };
            sqlize.authenticate()
                .then(() => {
                    console.log('connection succesfull.');
                    sqlize.DATA_TYPE = Sequelize
                    sqlize.defaultFields = {}
                    sqlize.syncDb = ()=>{
                        return new Promise((resolve,reject)=>{
                            resolve(sqlize.sync())
                        })
                    }
                    resolve(sqlize)
                })
                .catch(err => {
                    console.log('Not connect to the database:');
                    reject(err)
                });
        }
    })
}

module.exports = { connect };