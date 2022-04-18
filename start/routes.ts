import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})



Route.group(()=>{
  Route.resource("/user", "UsersController").apiOnly(),
  Route.resource("/sensores", 'SensoresController').apiOnly()
  Route.resource("/autos", 'AutosController').apiOnly()

  Route.post('/login' , "UsersController.login")
  Route.post('/logout' , "UsersController.logout")
  Route.get('/get/user' , "UsersController.usuario")
  Route.get('/', async () => {return { hello: 'world' }})
}).prefix('api/v1')

//Route.group(()=> {

 
  
//}).middleware(["auth"])