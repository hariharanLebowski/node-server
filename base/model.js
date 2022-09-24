
class model{
  constructor(db,name,fields,options = {}){
       this.schema = db.schema;
       this.name = name;
       this.db = db
       this.fields = {
         ...db.defaultFields,
         ...fields
       } 
       this.model = this.db.define(this.name,this.fields,options)
  } 
}

module.exports = model;