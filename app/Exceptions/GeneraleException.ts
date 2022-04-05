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
    protected statusPages = {
        '404': 'errors/not-found',
        '500..599': 'errors/server-error',
    }

    public async handle (error, modelo , response ) {
        // console.log(error)
        switch(modelo){
            case "usuarios":
                switch (error.code) {
                case 'E_PASSWORD_MISMATCH':
                    return response.unauthorized({error:'Contraseña incorrecta'})
                    break;
                case 'E_USER_NOT_FOUND':
                    return response.notFound({error:'Usuario no encontrado'})
                    break;
                case 'E_MISSING_DATABASE_ROW':
                    return response.notFound({error:'Usuario no encontrado'})
                    break;
                case 'E_INVALID_API_TOKEN':
                    return response.notFound({error:'Token invalido'})
                    break;
                default:
                    console.log(error)
                    return response.status(400).send({error:error.code})
                    break;
                }
            break;
            default:
                
        }
    }

}
