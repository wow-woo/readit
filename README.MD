# Fullstack

###

- redis
- postgresql
- mikro-ORM
- Node.js
- Express
- argon2
- graphql

### Learning flow

- mikro-ORM > postgresql
- redis : redis package for window is too old version > WSL2 >: install build-essential tcl > zsh > session > cookie

---

## typescript

decorators?
? sign >>> possibly to be undefined
! sign >>> possibly to be undefined, but i know it will be defined all the time
& sign >>> join 2 different types

## graphql

setting) cookie 쿠키를 세팅하려면 omit => include
"request.credentials": "include",

## type-graphql x mikor-orm

mikro-orm : typing database

graphql : resolver

@Query : select (no change to db)

@mutation : create , manipulate , delete

cast graphql query/mutation, mikro-orm activates along with graphql statement.

## auth

1-1)
cypt

argon2 <> bcrypt

1-2) session x redis

express-session  
redis connect-redis

## session flow

<br/>

###

user.id = 1

1. req.session.userId = user.id;
2. {userId:1} >>> send that to redis
3. redis stores data in key:value
   session: sdfhjcee >>> {userId : 1}
4. session middleware<br/>
   crypt it with secret and return skd3fljwlj2kldsfdsfi
   express-session will set a cookie on my browser

5. when you makes a request,<br/>
   send skd3fljwlj2kldsfdsfi to the server
6. decrypt it with secret on the server<br/>
   skd3fljwlj2kldsfdsfi >>> session: sdfhjcee
7. make a request to redis
   redis looks up with session: sdfhjcee
8. returns data {userId : 1}
9. req.session = { userId :1 }
