import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})



Route.group(()=>{

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Estas son las rutass para crear nuestros usuarios y nuestros autos /////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  
  Route.resource("/user", "UsersController").apiOnly()
  Route.post("usuario/autos", 'AutosController.getCarsByUser')
  Route.resource("/autos", 'AutosController').apiOnly()
  Route.get("/sensores", 'SensoresController.show')
  // Route.post("/auto/sensor", 'AutosController.registrar_sensor')
  
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Estas rutas sirven para que nuestro auto pueda acceder a los ultimos valores de ////////////
  //// movimiento asignadas por el usuario desde el sistema web, movil o api //////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  Route.post("/auto/last/movimiento", 'AutosController.getLastMovimiento')
  /*  EJEMPLO DE DEVOLUCION DE DATOS DE LOS MOVIMIENTOS
  {
	"value": [
		{
			"Motor_Delante": false,
			"Motor_Reversa": true,
			"Motor_Derecha": false,
			"Motor_Izquieda": false,
			"Motor_Apagado": false,
			"fecha": "2022-04-21T15:41:22.896Z"
      }
    ]
  }*/
  Route.post("/auto/last/leds", 'AutosController.getLastLeds')
  /*  EJEMPLO DE DEVOLUCION DE DATOS DE LOS MOVIMIENTOS
  {
    "value": [
      {
        "estado": false,
        "fecha": "2022-04-21T18:44:28.137Z"
      }
    ]
  }
  */
  
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Estas rutas sirven para que el usuario pueda setear valores al motor y a los leds //////////
  //// para poder mover el carro o poder prender y apagar las luces segun sus valores estas ///////
  //// rutas deben protegerse para evitar que alguien mueva el auto sin ser el usuario ////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  
  Route.post("/auto/set/movimiento", 'AutosController.setMovimiento')
  Route.post("/auto/set/leds", 'AutosController.setLeds')
  
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Esta ruta sirve para que el carrito la consuma y setee todos los valores en un mismo ///////
  //// lugar utilizando el json ///////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /* EJEMPLO DE COMO SE INYECTAN LOS DATOS
                {
                "auto":"OzAR3CF5ZJfMAYpsZJ5VJTrIKeH1zkCRZuZzPlX5",     ES EL ID DEL CARRO UTILIZADO
                "valores":{
                  "temperatura":{"valor":28},
                  "ultrasonico1":{"valor":29},
                  "ultrasonico2":{"valor":30},
                  "velocidad":{"valor":50},
                  "infrarrojo":{"valor":60}
                  }
                }
  */

  Route.post("/auto/set/valores", 'AutosController.setValores')
  /*
                {
                  "auto":"OzAR3CF5ZJfMAYpsZJ5VJTrIKeH1zkCRZuZzPlX5",
                  "valores":{
                    "estado":false
                  }
                }
  */

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Estas rutas sirven para obtener los valores de los diversos sensores que se usaron /////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  Route.post("/auto/get/movimiento", 'AutosController.getMovimiento')
  Route.post("/auto/get/leds", 'AutosController.getLeds')
  Route.post("/auto/get/temp", 'AutosController.getTemp')  
  Route.post("/auto/get/ultra1", 'AutosController.getUltra1')
  Route.post("/auto/get/ultra2", 'AutosController.getUltra2')
  Route.post("/auto/get/vel", 'AutosController.getVel')
  Route.post("/auto/get/infra", 'AutosController.getInfra')
    
  /////////////////////////////////////////////////////////////////////////////////////////////////
  //// Estas rutas utilizan la autenticacion para hacer el login, el logout, y tambien para ///////
  //// obtener los datos del usuario que tiene su sesion actualmente///////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  
  Route.post('/login' , "UsersController.login")
  Route.post('/logout' , "UsersController.logout")
  Route.get('/get/user' , "UsersController.usuario")
  Route.get('/', async () => {return { hello: 'world' }})
}).prefix('api/v1')

//Route.group(()=> {

 
  
//}).middleware(["auth"])