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
  nombre: string;
  dueño: Object;
  sensores: Array<Sensor>;
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
    _id: { type: Number, required: true },
    nombre: { type: String, required: true },
    dueño: { usuario:Object, required: false },
    sensores: [{ required: false }],
  });
  static AutoModel: any = model<IntAuto>('pelicula', this.autoSchema);

}
