import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})



Route.group(()=>{
  Route.resource("/user", "UsersController").apiOnly(),
  Route.resource("/sensores", 'SensoresController').apiOnly()
  Route.resource("/autos", 'AutosController').apiOnly()
  
  Route.post("/auto/sensor", 'AutosController.registrar_sensor')

  Route.post("/auto/set/movimiento", 'AutosController.setMovimiento')
  Route.post("/auto/get/movimiento", 'AutosController.getMovimiento')
  Route.post("/auto/last/movimiento", 'AutosController.getLastMovimiento')

  
  Route.post("/auto/set/leds", 'AutosController.setLeds')
  Route.post("/auto/get/leds", 'AutosController.getLeds')
  Route.post("/auto/last/leds", 'AutosController.getLastLeds')

  Route.post("/auto/get/temp", 'AutosController.getTemp')
  Route.post("/auto/set/temp", 'AutosController.setTemp')
  
  Route.post("/auto/get/vel", 'AutosController.getVel')
  Route.post("/auto/set/vel", 'AutosController.setVel')
  
  
  Route.post("/auto/set/valores", 'AutosController.setValores')
  
  
  Route.post('/login' , "UsersController.login")
  Route.post('/logout' , "UsersController.logout")
  Route.get('/get/user' , "UsersController.usuario")
  Route.get('/', async () => {return { hello: 'world' }})
}).prefix('api/v1')

//Route.group(()=> {

 
  
//}).middleware(["auth"])