type ConfigInput = {
  entities: any[];
  migrations: any[];
};

export const config = ({ entities, migrations }: ConfigInput) => ({
  production: {
    type: process.env.DB_DRIVER,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities,
    migrations,
  },

  development: {
    type: "postgres",
    host: "db",
    port: 5432,
    username: "sample",
    password: "longpassword",
    database: "ml_yara",
    entities,
    migrations,
  },
});
