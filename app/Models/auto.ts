import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import { Schema, model} from 'mongoose';

interface Sensor{
  _id: number;
  nombre: string;
  valores: Array<Object>;
}

interface IntAuto {
  _id: number;
  id: number;
  nombre: string;
  user: Object;
  motores: Array<Object>;
  ultrasonico1: Array<Object>;
  ultrasonico2: Array<Object>;
  leds: Array<Object>;
  velocidad: Array<Object>;
  infrarrojo: Array<Object>;
}

export default class AutoModel extends BaseModel{
  @column({ isPrimary: true })
  public id: number

  @column()
  public username :string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  static autoSchema = new Schema<IntAuto>({
    id: { type: Number, required: true },
    nombre: { type: String, required: false },
    user: { type:Object , required: false },
    motores: [{type:Object, required: false }],
    ultrasonico1: [{type:Object, required: false }],
    ultrasonico2: [{type:Object, required: false }],
    leds: [{type:Object, required: false }],
    velocidad: [{type:Object, required: false }],
    infrarrojo: [{type:Object, required: false }],
    
  });
  static AutoModel: any = model<IntAuto>('autos', this.autoSchema);

}
