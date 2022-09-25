const controller = require('../../base/controller');
const sendEmail = require('../../utils/sendEmail');

class places extends controller {
    constructor(baseUrl, db, app) {
        super(baseUrl, db, require('./model'), require('./route'), app)
    }
    post(req, res) {
        return new Promise((resolve,reject)=>{
         let promises = []        
        if(req.body['email']){
            const sendToUser = {
                from: 'info.4dflo@gmail.com',
                to: req.body['email'],
                subject: 'Welcome to 4D Flo',
                text: 'We are so happy, that you have decided to attend out trail classes. See you soon',
                html: '<p>We are so happy, that you have decided go attend out trail classes.<p> See you soon<br/><br/> Thanks and Regards,<br/>4D Flo team.'
            }
             
            promises.push(sendEmail(sendToUser)) 
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
        
        promises.push(sendEmail(sendTo4dFlo)) 
        Promise.all(promises).then(()=>{ 
            super.post(req,res).then(resolve).catch(reject)
        }).catch(reject)
    })
    }

}

module.exports = places;
