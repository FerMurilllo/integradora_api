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
      const autos = await auto.find({}); 
      return response.ok({
        autos: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async store({auth, request,response}: HttpContextContract) {
    try {
      await connect(url);


      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result1= '';
      const charactersLength = characters.length;
      for ( let i = 0; i < 40; i++ ) {
          result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      
      const user = await auth.use('api').authenticate()
      const autos= new auto({
        _id: result1,
        // id: result1,
        nombre : request.input('nombre'),
        user: user.serializeAttributes(),
      })
      await autos.save()

      return response.ok({
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

      return response.status(200).json({
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
      return response.ok({
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
      
      const carrito = await  auto.updateOne({id : request.input("auto")}, { 
        $push:{motores:valores}
      });
      const carro = await  auto.find({_id : request.input("auto")})
       
      return response.ok({
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
      return response.ok({
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async getLastMovimiento({ request,response}: HttpContextContract) {
    try {
      await connect(url);
      const value = await  auto.aggregate([
        {$match: { _id: request.input("auto") }}, 
        {$project: { motores: 1}}, 
        {$unwind: { path: '$motores'}}, 
        {$replaceRoot: { newRoot: '$motores'}}, 
        {$sort: { fecha: -1}}, 
        {$limit: 1}
      ])
       return response.ok({
        value: value
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async setLeds({ request,response}: HttpContextContract) {
    try {
      await connect(url);
      const valores = request.input('valores')
      valores.fecha = new Date()
      
      const carrito = await  auto.updateOne({id : request.input("auto")}, { 
        $push:{leds:valores}
      });
      const carro = await  auto.find({_id : request.input("auto")})
       
      return response.ok({
        mensaje : "Valores asignados correctamente",
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
    
  public async getLeds({ request,response}: HttpContextContract) {
    try {
      await connect(url);

      const carro = await  auto.find({_id : request.input("auto")}, {leds:1})
      return response.ok({
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async getLastLeds({ request,response}: HttpContextContract) {
    try {
      await connect(url);
      const value = await  auto.aggregate([
        {$match: { _id: request.input("auto") }}, 
        {$project: { motores: 1}}, 
        {$unwind: { path: '$leds'}}, 
        {$replaceRoot: { newRoot: '$leds'}}, 
        {$sort: { fecha: -1}}, 
        {$limit: 1}
      ])
       return response.ok({
        value: value
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  
  public async setTemp({ request,response}: HttpContextContract) {
    try {
      await connect(url);
      const valores = request.input('valores')
      valores.fecha = new Date()
      
      const carrito = await  auto.updateOne({id : request.input("auto")}, { 
        $push:{temperatura:valores}
      });
      const carro = await  auto.find({_id : request.input("auto")})
       
      return response.ok({
        mensaje : "Valores asignados correctamente",
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
    
  public async getTemp({ request,response}: HttpContextContract) {
    try {
      await connect(url);

      const carro = await  auto.find({_id : request.input("auto")}, {temperatura:1})
      return response.ok({
        auto: carro
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
}
