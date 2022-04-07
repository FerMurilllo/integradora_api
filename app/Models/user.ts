import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username :string

  @column()
  public email: string
  
  @column()
  public status: boolean

  @column()
  public rol:string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (users: User) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }
  
  static get crear (){
    return [ 
      'username',
      'email',
      'password',
      'rol',
    ]
  }
  
  static get actualizar (){
    return [ 
      'username',
      'email',
      'password',
      'rol',
    ]
  }

}
