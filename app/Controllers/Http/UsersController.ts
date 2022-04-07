import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/user'

import GeneraleException from 'App/Exceptions/GeneraleException'
import UserValidator from 'App/Validators/UserValidator'

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
      mensaje:"Sesion terminada" 
    }
  }

  public async index({response}: HttpContextContract) {
    try{
      const user = await User.all()
      const userJSON = user.map((user) => user.serialize())
      response.ok({
        usuarios: userJSON
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async store({request, response}: HttpContextContract, ctx: HttpContextContract) {
    try {
      
      const validacion = new UserValidator(ctx)
      if(request.body().email == "administrador@gmail.com"){
        request.body().rol == 'ADMIN'
      }
      
      const payload = await request.validate({ schema: validacion.Schema})
      const usuario = await User.create(payload)
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
      response.ok({ 
        usaurio : user
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
      
      response.ok({
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
      user.status = !user.status 
      response.ok({
        usuario: user,
        message: 'Usuario eliminado correctamente.'
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    } 
  }
}
