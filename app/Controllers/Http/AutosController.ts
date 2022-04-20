import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AutoModel from 'App/Models/auto';
import { connect } from 'mongoose';

// const url = 'mongodb://3.140.240.243:27017/';

// const url = 'mongodb://18.222.86.0:27017/IntegradoraAPI';
const url = 'mongodb://127.0.0.1:27017/IntegradoraAPI';

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
        autos: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async store({auth, request,response}: HttpContextContract) {
    try {
      await connect(url);
      const user = await auth.use('api').authenticate()
      const autos= new auto({
        nombre : request.input('nombre'),
        user: user.serializeAttributes(),
      })
      await autos.save()
      response.ok({
        auto: autos,
        mensaje: "Auto registrado correctamente"
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
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
      errores.handle(error, 'autos', response)
    }
  }

  public async update({request,params, response}: HttpContextContract) {
    try{
      await connect(url);
      const autos = await auto.updateOne({_id: params.id}, { 
        nombre : request.input("nombre")
      })
      response.ok({
        mensaje : "Auto actualizado correctamente",
        auto: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    try{
      await connect(url);
      const autos = await auto.deleteOne({_id: params.id}); 
      response.status(200).json({
        mensaje : "Auto eliminado correctamente",
        auto: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async setMovimiento({ request,response}: HttpContextContract) {
    try {
      await connect(url);
      const valores = request.input('valores')
      valores.fecha = new Date()
      
      console.log(1)
      
      const carrito = await  auto.updateOne({_id : request.input("auto")}, { 
        $push:{motores:valores}
      });
      const carro = await  auto.find({_id : request.input("auto")})
       
      response.ok({
        mensaje : "Valores asignados correctamente",
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
    
  public async getMovimiento({ request,response}: HttpContextContract) {
    try {
      await connect(url);

      const carro = await  auto.find({_id : request.input("auto")}, {motores:1})
      response.ok({
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  public async getLastMovimiento({ request,response}: HttpContextContract) {
    try {
      await connect(url);
      
      console.log(request.input("auto"))
      const value = await  auto.aggregate([
        {
          '$match': {
            "id": "62608c53b2c584668de4aba5"
          }
        }
      ])

       response.ok({
        value: value
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async setLight({ request,response}: HttpContextContract) {
    try {
      await connect(url);
      const valores = request.input('valores')
      valores.fecha = new Date()
      
      console.log(1)
      
      const carrito = await  auto.updateOne({_id : request.input("auto")}, { 
        $push:{motores:valores}
      });
      const carro = await  auto.find({_id : request.input("auto")})
       
      response.ok({
        mensaje : "Valores asignados correctamente",
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
    
  public async getLight({ request,response}: HttpContextContract) {
    try {
      await connect(url);

      const carro = await  auto.find({_id : request.input("auto")})
       
      response.ok({
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

}
