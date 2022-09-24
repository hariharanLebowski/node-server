class app {
    constructor(app, db, config) {
        this.routes = [
            new (require("./contact/controller"))("/contact", db, app, config),
        ]
    }
}

module.exports = app