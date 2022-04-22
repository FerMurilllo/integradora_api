import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dato from 'App/Models/Dato';
export default class DatosController {

    public async index({ response }:HttpContextContract) {
        const val = await Dato.all()
        return response.ok({
          Valor:val
        })
      }

        public async destroy({request, response}: HttpContextContract) {
            const as = await Dato.findOrFail(request.params().id)
            as.delete()
            return response.ok({
              datos:as,
              mensaje:'Dato eliminado correctamente'
            })
      }

      public async store( {request, response}: HttpContextContract) {
        try {
          const dato = await Dato.create(request.only(Dato.crear))
          return response.ok({
            Dato:dato,
            mensaje:'Dato creado correctamente'
          })
        } catch (e) {
          return response.ok({
            mensaje:'Dato No creado',
            error:e.code
          })
        }
      }
}
