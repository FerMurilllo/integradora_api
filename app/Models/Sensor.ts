import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sensor extends BaseModel {
  
  public static table = 'sensores'

  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nombre: string
  
  @column()
  public descripcion: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static get crear (){
    return [ 
      'nombre',
      'descripcion'
    ]
  }
  static get status(){
    return[
    'status']
  }
}
