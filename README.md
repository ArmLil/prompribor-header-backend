### Project with node.js, JWT, authentication, sequelize

DB_NAME= 'conroller_header'
node version 12.13.0

### Hints

    to initialize sequelize
     $ sequelize init

    to generate models and migrations
     $ sequelize model:create --name Users --attributes username:string,email:string,password:text
    then update the js files if you need it

    another example
    $ sequelize model:create --name CommunicationCenters --attributes name:string,distance:string,port:string,host:string,status:string,description:string

    $ sequelize model:create --name Registers --attributes address:string,dataType:string,sizeRegister:string,recordable:boolean,appointment:string,description:string

    $ sequelize model:create --name Fuel_Journals --attributes date:string,time:string,temperature:string,density:string,current_volume:string,current_mass:string,total_volume:string,total_mass:string,commCenterPath:string

    $ sequelize model:create --name MapPolylinePoints --attributes index:integer,lat:string,len:string,type:string,description:string

    $ sequelize model:create --name BridgePolylinePoints --attributes index:integer,lat:string,len:string,type:string,description:string

    $ sequelize model:create --name Registers_Controllers_values --attributes registerAddress:uuid,controllerModbusId:uuid,value:string


    create tables in db via migrations
       $ sequelize db:migrate
    seed
       $ sequelize db:seed:all

       //if seed one model
       sequelize db:seed --seed 20210517140506-controller_registersgroups.js

    seed create initializiing
    $ npx sequelize-cli seed:generate --name users

#### setup datasource

    1.install postgres if do not have then follow the steps bellow
      $ sudo -u postgres psql
      postgres=# create database conroller_header;
      postgres=# create user conroller_header_user with encrypted password '111111';
      postgres=# grant all privileges on database conroller_header to conroller_header_user;
    2.$ sequelize db:migrate

### to run the Project

    $ git clone https://github.com/ArmLil/prompribor-header-backend.git
    $ cd prompribor-header-backend
    $ npm install
    $ npm start

### API - description

    All the endpoints start with /api/v1, for example /register is implemented as /api/v1/register.
    Locally listening on http://localhost:3002
    Example endpoint
    http://localhost:3002/api/v1/register

    All the requests have headers with  “Content-Type: application/json”

    After registration for all other requests token is required in headers

    Registration implemented according to JWT https://jwt.io/

    In headers we need to add
    Authorization : Bearer token


    1. Registration

       1) method - post
          endpoint - /register

          request body example (email and username are unique )
           {
            	"password": "111111",
          	  "email": "armlilhov@mail.ru",
          	  "username": "username3"
           }


          expected response body example
          {
              "data": {
                  "user": [
                      {
                          "id": "9d6f27ac-3367-4496-bd57-c54a986e68e4",
                          "email": "armlilhov@mail.ru",
                          "username": "username3",
                          "updatedAt": "2019-12-18T13:13:27.608Z",
                          "createdAt": "2019-12-18T13:13:27.608Z",
                          "email_confirmed": false,
                          "deletedAt": null
                      },
                      true
                  ],
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiOWQ2ZjI3YWMtMzM2Ny00NDk2LWJkNTctYzU0YTk4NmU2OGU0IiwidXNlcm5hbWUiOiJ1c2VybmFtZTMiLCJlbWFpbCI6ImFybWxpbGhvdkBtYWlsLnJ1IiwiZW1haWxfY29uZmlybWVkIjpmYWxzZX0sImlhdCI6MTU3NjY3NDgwOCwiZXhwIjoxNTc2NzYxMjA4fQ.BoCFPlppYEv5HREEbbzKD9X1DrM46yIzBV9IbJroP9A",
                  "message": "Check armlilhov@mail.ru for confirmation "
              }
          }

          then the mentioned email should be checked for email confirmation or use the request described in the 2) point



          2) method - get
             endpoint - /confirmation/:token
            (token can be taken from the response of   /register request described in 2) point)

          3) method - post
             endpoint - /login

             request body example

              {
                "email": "armlilhov@mail.ru",
                "password": "111111"
              }

            expected response body example
            {
                "data": {
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiOWQ2ZjI3YWMtMzM2Ny00NDk2LWJkNTctYzU0YTk4NmU2OGU0IiwidXNlcm5hbWUiOiJ1c2VybmFtZTMiLCJlbWFpbCI6ImFybWxpbGhvdkBtYWlsLnJ1IiwiZW1haWxfY29uZmlybWVkIjp0cnVlfSwiaWF0IjoxNTc2Njc5MTU4LCJleHAiOjE1NzY3NjU1NTh9.OsfcCWB3EMSoIwMssAaznw0-5TL01UiiKyshjOctGIY"
                }
            }

### Tiles

to get new tiles for map follow the instruction https://qna.habr.com/q/171137

### Admin

password - 12345678
login - Админ

password - 11111111
login - Гость
