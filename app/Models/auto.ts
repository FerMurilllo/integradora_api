import { Schema, model } from 'mongoose';

interface Auto {
    nombre: string,
    user : Object,  
    sensores : Array<Object>
}

export default class AutoModel{

  static schema = new Schema<Auto>({
    nombre : {type: String, required : true},
    user : { type : Object},
    sensores : [{ nombre:String ,valor:Number }]
  });

  static AutoModel = model<Auto>('Auto', this.schema);
}
