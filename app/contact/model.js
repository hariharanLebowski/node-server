const model = require('../../base/model');

class contact extends model {
    constructor(db) {
        super(db, "contact", { 
            id:{ 
                type: db.DATA_TYPE.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: db.DATA_TYPE.STRING
            },
            parentName:{
                type: db.DATA_TYPE.STRING 
            },
            category:{
                type: db.DATA_TYPE.STRING 
            },
            trail:{
                type: db.DATA_TYPE.STRING
            },
            email:{
                type: db.DATA_TYPE.STRING
            },
            phno:{
                type: db.DATA_TYPE.STRING
            },
            comment:{
                type: db.DATA_TYPE.STRING
            }
        }, {
            indexes: [] 
        })
    }
}

module.exports = contact;
