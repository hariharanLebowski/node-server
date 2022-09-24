const controller = require('../../base/controller');

class places extends controller {
    constructor(baseUrl, db, app) {
        super(baseUrl, db, require('./model'), require('./route'), app)
    }

}

module.exports = places;
