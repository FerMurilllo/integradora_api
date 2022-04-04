import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login' , "UsersController")
Route.post('/logout' , "UsersController")


//Route.group(()=> {

  Route.resource("/User", "UsersController"),
  Route.resource("/sensores", 'SensoresController')
 
  
//}).middleware(["auth"])