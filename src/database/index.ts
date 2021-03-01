import { create } from "ts-node";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions();

  return createConnection();
  // Should change the database for tests.
  // Heroku does not allow second database, so using the same for this small
  // project
  // return createConnection(
  //   Object.assign(options, {
  //     database:
  //       process.env.NODE_ENV === "test" ? "online_test" : options.database,
  //   })
  // );
};
