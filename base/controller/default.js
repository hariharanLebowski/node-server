

class controller {
    constructor(baseUrl, db, model, route, app) {
        this.db = db;
        this.baseUrl = baseUrl;
        this.app = app;
        this.modelObj = new model(db)
        this.model = this.modelObj.model;
        this.route = new route(this);
        db.models[this.model.name].controller = this
    }

    get(req, res) {
        return new Promise((resolve, reject) => {
            this.model.find(req.query).then(data => {
                resolve(data)
            }).catch(reject)
        })
    }

    post(req, res) {
        return new Promise((resolve, reject) => {
            this.model.create(this.buildCreateObject(req.body)).then(data => {
                resolve(data)
            }).catch(reject)
        })
    }

    delete(req, res) {
        return new Promise((resolve, reject) => {
            if (!req.query._id)
                return reject("INVALID_REQUEST")
            this.model.deleteOne(req.query).then(data => {
                resolve(data)
            }).catch(reject)
        })
    }

    put(req, res) {
        // clear specific docs on cache
        return new Promise((resolve, reject) => {
            if (!req.body._id)
                return reject("INVALID_REQUEST")
            this.model.updateOne({ _id: req.body._id }, { $set: this.buildUpdateObject(req.body) }).then(data => {
                resolve(data)
            }).catch(reject)
        })
    }

    buildCreateObject(data) {
        return data
    }

    buildUpdateObject(data) {
        return data;
    }
}

module.exports = controller;