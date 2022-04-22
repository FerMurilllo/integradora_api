import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sensor extends BaseModel {
  
  public static table = 'datos'

  @column({ isPrimary: true })
  public id: number
  
  @column()
  public valor: number

  static get crear (){
    return [ 
      'valor',
    ]
  }
}