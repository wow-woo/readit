//for type-graphql
import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/Post";
import { UserResolver } from "./resolvers/User";
import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";
import { __prod__ } from "./constants";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  //run migration by code instead of in cli : corresponds to npx mikro-orm migration:create
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);

  const redisClient = redis.createClient();

  //set cors configuration globally
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1day
        httpOnly: true, //JS from frontend can not access to cookie
        sameSite: "lax", // protecting from CSRF
        secure: __prod__, //cookie only with in https
      },

      saveUninitialized: false, //if true, despite nothing, create empty session and persist
      secret: "xcjvklxcjvkls",
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),

    //you can access from every resolvers
    //takes in parameters of req, res
    //access cookie/session with req, res
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
    // apollo cors setting on this route
    // cors: { origin: "http://localhost:3000" },
  });

  app.listen(4000, () => console.log("server started on 4000 port"));

  // const post = orm.em.create(Post, { title: "my first post" });
  // await orm.em.persistAndFlush(post);
  // const posts = await orm.em.find(Post, {});
  // console.log(posts);
  // console.log("--------------------sql-----------------");

  //class Post entity doesn't work with nativeInsert method
  // await orm.em.nativeInsert(Post, { title: "my second post" });
};
main().catch((err) => console.log(err));
