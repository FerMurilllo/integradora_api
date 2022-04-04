import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/users'

export default class UsersController {
    
  public async login({auth, request, response}:HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      const token = await auth.use('api').attempt(email, password)
      
      response.status(200).json({
        message:'Token generado',
        data: token
      })

    } catch {
      response.status(400).json({
        data: response.badRequest('Invalid credentials')
      })  
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
        status : true, 
        message: 'Satifactorio. Se encontro todos los User.',
        data: userJSON
      })
    }
    catch(error){
      response.status(404).json({
        status : false, 
        message : "ERROR. No se encontro ningun User."
      })
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    try {
      const user = new User()

      user.username = request.input("username")
      user.rol = request.input('rol')
      user.email = request.input("email")
      user.password = request.input("password")

      user.save()
      const userJSON = user.serialize()
      
      response.status(200).json({
        status : true, 
        message: 'Satifactorio. Creaste un User nuevo.',
        data: userJSON
      })

    } catch (error) {
      response.status(400).json({
        status : false, 
        message : "ERROR. No has creado User nuevo."
      })
    }

  }

  public async show({params, response}: HttpContextContract) {
    try{
      const user = await User 
      .query() 
      .where('email', params.id)
      .orWhere('id', params.id)
      .firstOrFail()

      response.status(200).json({
        status : true, 
        message: 'Satifactorio. Se Encotnro el User.',
        data : user
      })
    }
    catch(error){
      response.status(400).json({
        status : false, 
        message : "ERROR. Nos se ha encontrado User."
      })
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    try{
      const user = await User.findOrFail(params.id)
      user.username = request.input("username")
      user.email = request.input("email")
      user.password = request.input("password")

      user.save()
      const userJSON = user.serialize()
      
      response.status(200).json({
        status : true, 
        message: 'Satifactorio. Se encontro y actualizaste uno User.',
        data : userJSON
      })
    }
    catch(error){
      response.status(400).json({
        status : false, 
        message : "ERROR. No se encontro y no se actualizo uno User."
      })
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
    }
    catch{
      response.status(200).json({
        status : false, 
        message : "ERROR. No has eliminado un User."
      })
    }
    
  }


}
