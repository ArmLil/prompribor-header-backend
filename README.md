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

    $ sequelize model:create --name MapPolylinePoints --attributes index:integer,lat:string,lon:string,type:string,description:string

    $ sequelize model:create --name BridgePolylinePoints --attributes index:integer,lat:string,lon:string,type:string,description:string

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

интерактивная карта

https://www.geoplaner.com/?z=15;m=de;p=56.18541,42.8711;p=56.19016,42.85468;p=56.18581,42.87058;p=56.1869,42.86716;p=56.18675,42.86703;p=56.18559,42.86815;p=56.18554,42.86844;p=56.18668,42.86612;p=56.18662,42.86639;p=56.18542,42.8676;p=56.18526,42.86762;p=56.18642,42.86658;p=56.18633,42.86645;p=56.18624,42.86655;p=56.18625,42.86674;p=56.186,42.86693;p=56.18588,42.86681;p=56.18576,42.86698;p=56.18578,42.86719;p=56.18658,42.86719;p=56.18662,42.86751;p=56.18655,42.8676;p=56.18644,42.86739;p=56.18619,42.86763;p=56.1862,42.86787;p=56.18611,42.86798;p=56.18601,42.86778;p=56.18665,42.86367;p=56.18655,42.86325;p=56.18498,42.86294;p=56.18485,42.8632;p=56.18673,42.86239;p=56.18658,42.86269;p=56.18505,42.86241;p=56.18491,42.86204;p=56.1852,42.86807;p=56.18705,42.85994;p=56.18697,42.85958;p=56.18556,42.85882;p=56.18539,42.85895;p=56.18726,42.85882;p=56.18713,42.85897;p=56.18565,42.8582;p=56.18556,42.85792;p=56.18648,42.85888;p=56.18737,42.86874;p=56.19181,42.86097;p=56.18383,42.89835;p=56.18701,42.89011;p=56.18937,42.88517;p=56.18832,42.87784;p=56.18949,42.88127;p=56.1849,42.89316;p=56.18412,42.89547;p=56.18538,42.87239;p=56.18607,42.87419;p=56.18975,42.88685;p=56.19018,42.85516;p=56.18397,42.89947;p=56.19862,42.85935;p=56.18274,42.87479;p=56.19097,42.85788;p=56.19163,42.86104;p=56.19113,42.86091;p=56.19171,42.86033;p=56.19193,42.86099;p=56.19404,42.85934;p=56.19077,42.87192;;
