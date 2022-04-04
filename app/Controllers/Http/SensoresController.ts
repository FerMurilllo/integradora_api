import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AutoModel from 'App/Models/auto';
import { connect } from 'mongoose';

const url = 'mongodb://localhost:27017/Integradora_API';
const auto = AutoModel.AutoModel; 


export default class SensoresController {

    public async index({ response }: HttpContextContract) {
        try{
          await connect(url);
          const autos = await auto.find({}); 
    
          response.status(200).json({
            message: 'Successfully',
            data: autos
          })
        }
        catch(error){
          response.status(404).json({
            message : "Failing created a new model."
          })
        }
      }
    
    
      public async store({request,response}: HttpContextContract) {
        try {
          await connect(url);

          const autos= new auto({
            nombre : request.input('nombre')
          })
          await autos.save()
          
          response.status(200).json({
            message: 'Successfully.',
            data: autos
          })
    
        } catch (error) {
          response.status(400).json({
            message : "Failing."
          })
        }
      }
    
      public async show({params, response}: HttpContextContract) {
        try{
          await connect(url);
    
          const autos = await  auto.find({idSensor : params.id});
    
          response.status(200).json({
            massage : "Satifactorio. Usuario encontrado",
            data : autos
          })
        }
        catch(error){
          response.status(400).json({
            massage : "Error. Usuario no enocntrado.",
          })
        }
      }
    
      public async update({request,params, response}: HttpContextContract) {
        try{
          await connect(url);
          const autos = await auto.update({_id: params.id}, 
           { 
            nombre : request.input("nombre"),
            user: request.input("usuario"),
            $push:{
              sensores: request.input('sensores')
            }
                   //inserted data is the object to be inserted 
          })
          response.status(200).json({
            massage : "Satifactorio. ",
            data : autos
          })
        }
        catch(error){
          response.status(400).json({
            massage : "Error.",
          })
        }
      }
    
      public async destroy({params, response}: HttpContextContract) {
        try{
          await connect(url);
          const autos = await auto.findByIdAndDelete(params.id); 
          
          response.status(200).json({
            massage : "Satifactorio. ",
            data: autos
          })
        }
        catch{
          response.status(200).json({
            massage : "Error. ",
          })
        }
      }


}
