
import Sensor from 'App/Models/Sensor';

export default class SensoresController {

  public async index({ response }) {
    const auto = await Sensor.all()
    return response.ok({
      autos:auto
    })
  }

  public async show({params, response}) {
    const sen =  await Sensor.find(params.id)
    if( sen == null){
        return response.status(400).send({
            message: "Sensor No Encontrado",
        })
    }else{
        return response.status(200).send({
            Sensor: sen,
        })
    }      
  }

  public async destroy({params, response}) {
    const sen:any =  await Sensor.find(params.id)
    try {
      if(sen.status == 1){
        sen.status = 0
        await sen.save()
        return response.status(201).send({
          Sensor: sen,
          message:"Status InActivo"
      })}else if(sen.status == 0){
        sen.status = 1
        await sen.save()
        return response.status(201).send({
          Sensor: sen,
          message:"Status Activo"
      })
      }

      }catch (e) {
        return response.status(400).send({
            Fail:"Ha Ocurrido Un Error"
        })}
}
}
