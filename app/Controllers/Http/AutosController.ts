import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AutoModel from 'App/Models/auto';
import { connect } from 'mongoose';

// const url = 'mongodb://3.140.240.243:27017/';

//const url = 'mongodb://127.0.0.1:27017,127.0.0.1:27018,127.0.0.1:27019/IntegradoraAPI';
/*                                     /                                 //                             //                             */
const url = 'mongodb://3.140.240.243:27017,18.222.86.0:27017,3.138.67.71:27017/IntegradoraAPI'; 

const auto = AutoModel.AutoModel; 

import GeneraleException from 'App/Exceptions/GeneraleException'

const errores = new GeneraleException()

export default class AutosController {

  async conexion(){
    await connect(url)
    .then(() => console.log("Mongodb connected"))
    .catch(err => {
      console.log(err)
    });
  }

  public async index({ response }: HttpContextContract) {
    try{
      this.conexion()
      const autos = await auto.find({}); 
      return response.ok({
        autos: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async getCarsByUser({ auth, response }: HttpContextContract) {
    try{
      this.conexion() 
      const user = await auth.use('api').authenticate()
      const autos = await auto.find({user:user.serializeAttributes()})
      return response.ok({
        autos: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async store({auth, request,response}: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      
      this.conexion();

      // const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      // let result1= '';
      // const charactersLength = characters.length;
      // for ( let i = 0; i < 40; i++ ) {
      //     result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
      // }
      
      const autos= new auto({
        _id: request.input('codigo_serie'),
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
      
      this.conexion();

      const autos = await  auto.find({_id : params.id});

      return response.status(200).json({
        auto: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async update({request,params, response}: HttpContextContract) {
    try{
      
      this.conexion();
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
      
      this.conexion();
      const autos = await auto.deleteOne({_id: params.id}); 
      response.status(200).json({
        mensaje : "Auto eliminado correctamente",
        auto: autos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async setMovimiento({ auth, request,response}: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      
      
      this.conexion();
      const valores = request.input('valores')
      valores.fecha = new Date()
      
      const carrito = await  auto.updateOne({
        _id : request.input("auto")
      }, { 
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
      
      this.conexion();

      const movimientos = await  auto.find({_id : request.input("auto")}, {motores:1})
      return response.ok({
        movimientos: movimientos
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async getLastMovimiento({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();
      const movimiento = await  auto.aggregate([
        {$match: { _id: request.input("auto") }}, 
        {$project: { motores: 1}}, 
        {$unwind: { path: '$motores'}}, 
        {$replaceRoot: { newRoot: '$motores'}}, 
        {$sort: { fecha: -1}}, 
        {$limit: 1}
      ])
       return response.ok({
        movimiento: movimiento
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async setLeds({ auth, request,response}: HttpContextContract) {
    try {
      const user = await auth.use('api').authenticate()
      
      this.conexion();
      const valores = request.input('valores')
      valores.fecha = new Date()
      // const carrito = await auto.find({user:user.serializeAttributes()})
      const carrito = await  auto.updateOne({
        id : request.input("auto")
      }, { 
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
      
      this.conexion();

      const estados = await  auto.find({_id : request.input("auto")}, {leds:1})
      return response.ok({
        estados: estados
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async getLastLeds({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();
      const estado = await  auto.aggregate([
        {$match: { _id: request.input("auto") }}, 
        {$project: { leds: 1}}, 
        {$unwind: { path: '$leds'}}, 
        {$replaceRoot: { newRoot: '$leds'}}, 
        {$sort: { fecha: -1}}, 
        {$limit: 1}
      ])
       return response.ok({
        estado: estado
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
    
  public async getTemp({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();

      const temperaturas = await  auto.find({_id : request.input("auto")}, {temperatura:1})
      return response.ok({
        temperaturas: temperaturas
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
 
  public async getUltra1({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();

      const ultrasonico = await  auto.find({_id : request.input("auto")}, {ultrasonico1:1})
      return response.ok({
        ultrasonico: ultrasonico
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async getUltra2({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();

      const ultrasonico = await  auto.find({_id : request.input("auto")}, {ultrasonico2:1})
      return response.ok({
        ultrasonico: ultrasonico
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async getVel({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();

      const velocidades = await  auto.find({_id : request.input("auto")}, {velocidad:1})
      return response.ok({
        velocidades: velocidades
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async getInfra1({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();

      const infrarrojo = await  auto.find({_id : request.input("auto")}, {infrarrojo1:1})
      return response.ok({
        infrarrojo: infrarrojo
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }
  
  public async getInfra2({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();

      const infrarrojo = await  auto.find({_id : request.input("auto")}, {infrarrojo2:1})
      return response.ok({
        infrarrojo: infrarrojo
      })
    } catch (error) {
      errores.handle(error, 'autos', response)
    }
  }

  public async setValores({ request,response}: HttpContextContract) {
    try {
      
      this.conexion();
	//console.log("falla aqui")
      const valores = request.input('valores')
      valores.temperatura.fecha = new Date()
      valores.ultrasonico1.fecha = new Date()
      valores.ultrasonico2.fecha = new Date()
      valores.velocidad.fecha = new Date()
      valores.infrarrojo1.fecha = new Date()
      valores.infrarrojo2.fecha = new Date()
      //console.log("falla aca")
      const carrito = await  auto.updateOne({_id : request.input("auto")}, { 
        $push:{
          temperatura:valores.temperatura,
          ultrasonico1:valores.ultrasonico1,
          ultrasonico2:valores.ultrasonico2,
          velocidad:valores.velocidad,
          infrarrojo1:valores.infrarrojo1,
          infrarrojo2:valores.infrarrojo2
        }
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

  public async getLastDataByCar({response} : HttpContextContract) {
    try{
      this.conexion()
      const data = await auto.aggregate([
        {
          '$match': {
            '_id': '123456789'
          }
        }, {
          '$project': {
            '_id': 0, 
            'nombre': 0, 
            'user': 0
          }
        }, {
          '$unwind': {
            'path': '$motores'
          }
        }, {
          '$sort': {
            'motores.fecha': -1
          }
        }, {
          '$limit': 1 
        }, {
          '$unwind': {
            'path': '$leds'
          }
        }, {
          '$sort': {
            'leds.fecha': -1
          }
        }, {
          '$limit': 1
        }, {
          '$unwind': {
            'path': '$ultrasonico1'
          }
        }, {
          '$sort': {
            'ultrasonico1.fecha': -1
          }
        }, {
          '$limit': 1
        }, {
          '$unwind': {
            'path': '$ultrasonico2'
          }
        }, {
          '$sort': {
            'ultrasonico2.fecha': -1
          }
        }, {
          '$limit': 1
        }, {
          '$unwind': {
            'path': '$velocidad'
          }
        }, {
          '$sort': {
            'velocidad.fecha': -1
          }
        }, {
          '$limit': 1
        }, {
          '$unwind': {
            'path': '$infrarrojo1'
          }
        }, {
          '$sort': {
            'infrarrojo1.fecha': -1
          }
        }, {
          '$limit': 1
        }, {
          '$unwind': {
            'path': '$infrarrojo2'
          }
        }, {
          '$sort': {
            'infrarrojo2.fecha': -1
          }
        }, {
          '$limit': 1
        }, {
          '$unwind': {
            'path': '$temperatura'
          }
        }, {
          '$sort': {
            'temperatura.fecha': -1
          }
        }, {
          '$limit': 1
        }
      ]);

      return response.ok({
        autos: data
      })
    }
    catch(error){
      errores.handle(error, 'autos', response)
    }
  }
}
