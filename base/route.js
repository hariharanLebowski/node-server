class route {
   constructor(_this) {
      this.app = _this.app;
      this.baseUrl = _this.baseUrl
      this.controller = _this;
      this.init()
   }
   
   init() { 
      this.app.get(this.baseUrl, (req, res, next) => {
         this.controller.get(req,res)
            .then(data => this.send(res,data))
            .catch(next);
      })
 
      this.app.post(this.baseUrl, (req, res, next) => {
         this.controller.post(req,res)
            .then(data => this.send(res,data))
            .catch(next);
      })
 
      this.app.put(this.baseUrl, (req,res,next) => {
         this.controller.put(req,res)
            .then(data => this.send(res,data))
            .catch(next);
      })
 
      this.app.delete(this.baseUrl, (req,res,next) => {
         this.controller.delete(req,res)
            .then(data=>this.send(res,data))
            .catch(next);
      }) 
   }
   send(res,data){ 
      res.status(200).json({
         data:data,
         code : 200,
         message:""
      })
  }
}

module.exports = route;