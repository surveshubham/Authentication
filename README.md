
Register api
http://localhost:8000/auth/register
{
  "username" : "shubham",
  "password" : "Shubham@123",
  "role" : "user"
}


Login Api
http://localhost:8000/auth/login
{
  "username" : "shubham4",
  "password" : "Shubham@123"
}


logOut Api
http://localhost:8000/auth/logout

//User and Admin can access this
http://localhost:8000/auth/protected

//only admin can access this
http://localhost:8000/auth/admin





