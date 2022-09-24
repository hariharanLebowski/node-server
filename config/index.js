module.exports = {
    app: {
        port: 3000
    },
    db: {
        type: 'mysql',
        port: 3306,
        dbname: "4dflo",
        username: "root",
        password: "root",
        server: "localhost",
        pool: {
            max: 10,
            min: 1,
            acquire: 30000,
            idle: 10000
        },
        options: {
            autoIndex: true,
            family: 4,
            autoCreate: true,
            replication: '',
            logging: false,
            sockPath: ''
        }
    },
    services: {
        user: {
            username: "",
            password: ""
        }
    }

}