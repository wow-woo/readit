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
- redis > WSL2

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
