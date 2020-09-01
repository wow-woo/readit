import { User } from "./entities/User";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

import path from "path";
import { MikroORM } from "@mikro-orm/core";

export default {
  entities: [Post, User],
  //make sure typing db name, not server name, +12hours
  dbName: "reddick",
  password: "pg15",
  type: "postgresql",
  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
} as Parameters<typeof MikroORM.init>[0];
