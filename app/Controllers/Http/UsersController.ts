import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'

import GeneraleException from 'App/Exceptions/GeneraleException'

const errores = new GeneraleException()

export default class UsersController {

  async  usuario ({auth, response }) {
    try {
      return response.ok({usuario: await auth.use('api').authenticate()})
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async login({auth, request, response}:HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password)
      response.ok({
        mensaje:'Sesion iniciada',
        access_token: token
      })

    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async logout({auth}){
    await auth.use('api').revoke()
    return {
      revoked: true
    }
  }

  public async index({response}: HttpContextContract) {
    try{
      const user = await User.all()
      const userJSON = user.map((user) => user.serialize())
      response.status(200).json({
        usuarios: userJSON
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async store({request, response}: HttpContextContract) {
    try {
      const usuario = await User.create(request.only(User.crear))
      return response.ok({
        usuario:usuario,
        mensaje:'Usuario creado correctamente'
      })

    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }

  }

  public async show({params, response}: HttpContextContract) {
    try{
      const user = await User.findOrFail(params.id)

      response.status(200).json({
        status : true, 
        user : user
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async update({params, request, response}: HttpContextContract) {
    try{
      const user = await User.findOrFail(params.id)
      user.merge(request.only(User.actualizar))
      user.save()
      const userJSON = user.serialize()
      
      response.status(200).json({
        mensaje: 'Usuario actualizado correctamente.',
        usuario: userJSON
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      const user = await User.findOrFail(params.id)
      await user.delete()
      
      response.status(200).json({
        status : true, 
        message: 'Satifactorio. Has elimiado un User.',
        data: user
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
    
  }


}
