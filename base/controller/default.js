var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.4dflo@gmail.com',
    pass: 'mpajhlqhlwktqiji'
  }
});

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

        if(req.body['email']){
            const sendToUser = {
                from: 'info.4dflo@gmail.com',
                to: req.body['email'],
                subject: 'Welcome to 4D Flo',
                text: 'We are so happy, that you have decided to attend out trail classes. See you soon',
                html: '<p>We are so happy, that you have decided go attend out trail classes.<p> See you soon<br/><br/> Thanks and Regards,<br/>4D Flo team.'
            }

            transporter.sendMail(sendToUser, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            });
        }

        const sendMailHtml = 'Name :' + req.body.name + '<br/>' +
                'Parent Name : ' + req.body.parentName + '<br/>' +
                'Age Category : ' + req.body.category + '<br/>' +
                'Trail Session : ' + req.body.trail + '<br/>' +
                'Phone Number : ' + req.body.phno + '<br/>' +
                'Email : ' + req.body.email + '<br/>';

        const sendTo4dFlo = {
            to: 'info.4dflo@gmail.com',
            from: 'info.4dflo@gmail.com',
            subject: '4D Flo New Trail Registration',
            text: 'New Registration',
            html: sendMailHtml
        }

        transporter.sendMail(sendTo4dFlo, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

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