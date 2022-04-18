import { Exception } from '@adonisjs/core/build/standalone'
// }import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new GeneraleException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class GeneraleException extends Exception {
    constructor() {
        super("Logger")
    }

    public async handle (error, modelo , response ) {
        // console.log(error)
        switch(modelo){
            case "usuarios":
                switch (error.code) {
                case 'E_INVALID_AUTH_PASSWORD':
                    return response.unauthorized({error:'Contraseña incorrecta'})
                    break;
                case 'E_INVALID_AUTH_UID':
                    return response.notFound({error:'Usuario no encontrado'})
                    break;
                case 'E_ROW_NOT_FOUND':
                    return response.notFound({error:'Usuario no encontrado'})
                    break;
                case 'E_INVALID_API_TOKEN':
                    return response.notFound({error:'Token invalido'})
                    break;
                case 'ER_DUP_ENTRY':
                    return response.notFound({error:'El correo ya esta en uso'})
                    break;
                    
                case 'E_VALIDATION_FAILURE':
                    return response.notFound({error:'Error de validacion', mensajes: error.messages})
                    break;
                default:
                    console.log(error)
                    return response.status(400).send({error:error.code})
                    break;
                }
            break;
            case "sensores":
                switch (error.code) {
                case '':
                    return response.unauthorized({error:'Contraseña incorrecta'})
                    break;
                default:
                    console.log(error)
                    return response.status(400).send({error:error.code})
                    break;
                }
            break;
            default:
                break;
        }
    }

}
