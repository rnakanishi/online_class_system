import { create } from "ts-node";
import {
  Connection,
  createConnection,
  getConnectionOptions,
  UsingJoinColumnIsNotAllowedError,
} from "typeorm";
import { preProcessFile } from "typescript";

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions();

  if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
    Object.assign(options, {
      type: "postgres",
      host: "localhost",
      database: "online_test",
      port: 5432,
      username: "cefis",
      password: "cefis123",
    });

    if (process.env.NODE_ENV === "dev") {
      Object.assign(options, {
        database: "online_classes",
      });
    }

    console.log(options);
    return createConnection(options);
  }

  return createConnection();
};
