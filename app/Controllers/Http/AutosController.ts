import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AutoModel from 'App/Models/auto';
import { connect } from 'mongoose';

// const url = 'mongodb://3.140.240.243:27017/';

const url = 'mongodb://18.222.86.0:27017/';
// const url = 'mongodb+srv://mike:platinum@sandbox.tbdy0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const auto = AutoModel.AutoModel; 

import GeneraleException from 'App/Exceptions/GeneraleException'

const errores = new GeneraleException()

export default class AutosController {

  public async index({ response }: HttpContextContract) {
    try{
      await connect(url)
      .then(() => console.log("Mongodb connected"))
      .catch(err => {console.log(err), console.log("no jalo :c")});
      const autos = await auto.find({}); 
      response.ok({
        auto: autos
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async store({request,response}: HttpContextContract) {
    try {
      await connect(url);
      const autos= new auto({
        nombre : request.input('nombre')
      })
      await autos.save()
      response.ok({
        auto: autos,
        mensaje: "Auto registrado correctamente"
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async show({params, response}: HttpContextContract) {
    try{
      await connect(url);

      const autos = await  auto.find({idSensor : params.id});

      response.status(200).json({
        auto: autos
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async update({request,params, response}: HttpContextContract) {
    try{
      await connect(url);
      const autos = await auto.updateOne({_id: params.id}, 
        { 
        nombre : request.input("nombre"),
        user: request.input("usuario"),
        $push:{
          sensores: request.input('sensor')|request.input('sensores')
        }
      })
      response.ok({
        massage : "Auto actualizado correctamente",
        auto: autos
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      await connect(url);
      const autos = await auto.deleteOne({_id: params.id}); 
      response.status(200).json({
        massage : "Auto eliminado correctamente",
        data: autos
      })
    } catch (error) {
      errores.handle(error, 'usuarios', response)
    }
  }
}
