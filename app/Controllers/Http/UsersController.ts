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

  public async logout({auth, response}){
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
  public async store( ctx: HttpContextContract) {
    try {
      const validacion = new UserValidator(ctx)
      
      const payload = await ctx.request.validate({ schema: validacion.Schema})
      const usuario = await User.create(payload)
      return ctx.response.ok({
        usuario:usuario,
        mensaje:'Usuario creado correctamente'
      })

    } catch (error) {
      // response.badRequest(error.messages)
      errores.handle(error, 'usuarios',   ctx.response)
    }

  }
  public async show({params, response}: HttpContextContract) {
    try{
      const user = await User.findOrFail(params.id)
      response.ok({ 
        usuario : user
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
    const US:any =  await User.find(params.id)
    try {
      if(US.status == 1){
        US.status = 0
        await US.save()
        return response.status(201).send({
          Usuario: US,
          message:"Status InActivo"
      })}else if(US.status == 0){
        US.status = 1
        await US.save()
        return response.status(201).send({
          Usuario: US,
          message:"Status Activo"
      })
      }

      }catch (e) {
        return response.status(400).send({
            Fail:"Ha Ocurrido Un Error"
        })}
  }
}