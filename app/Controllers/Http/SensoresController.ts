import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sensor from 'App/Models/Sensor';
import GeneraleException from 'App/Exceptions/GeneraleException'

const errores = new GeneraleException()

export default class SensoresController {
  public async index({ response }:HttpContextContract) {
    const sensor = await Sensor.all()
    return response.ok({
      sensor:sensor
    })
  }

  public async show({params, response}:HttpContextContract) {
    try {
      const sensor =  await Sensor.findOrFail(params.id)
      return response.ok({
          sensor: sensor,
      })
    } catch (error) {
      errores.handle(error, 'sensores', response)
    }
  }

  public async store( {request, response}: HttpContextContract) {
    try {
      const sensor = await Sensor.create(request.only(Sensor.crear))
      return response.ok({
        sensor:sensor,
        mensaje:'Sensor creado correctamente'
      })
    } catch (error) {
      errores.handle(error, 'sensores', response)
    }
  }
  
  public async update( {params,request, response}: HttpContextContract) {
    try {
      const sensor = await Sensor.findOrFail(params.id)
      sensor.merge(request.only(Sensor.crear))
      return response.ok({
        sensor:sensor,
        mensaje:'Sensor actualizado correctamente'
      })
    } catch (error) {
      errores.handle(error, 'sensores', response)
    }
  }

  public async destroy({params, response}:HttpContextContract) {
    try {
      const sensor =  await Sensor.findOrFail(params.id)
      sensor.status = !sensor.status
      await sensor.save()
      if(sensor.status){
        return response.ok({
          sensor: sensor,
          mensaje:"Status Inactivo"
        })
      }else if(!sensor.status){
        return response.ok({
          sensor: sensor,
          mensaje:"Status Activo"
        })
      }
    }catch (error) {
      errores.handle(error, 'sensores', response)
    }
  }
}
