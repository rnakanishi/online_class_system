import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions();
  console.log(options);
  return createConnection(
    Object.assign(options, {
      database:
        process.env.NODE_ENV === "test" ? "online_test" : options.database,
    })
  );
};
