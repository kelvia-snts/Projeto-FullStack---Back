import dotenv from "dotenv";
import knex, { Knex } from "knex";

dotenv.config();

export abstract class BaseDatabase {
  private static connection: Knex | null = null;

  protected tableNames = {
    users: "Listeners",
    musics: "Musics",
    genres: "Genre",
    albums: "Album",
    follow: "Music_follow",
  };

  protected getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
          port: 3306,
          multipleStatements: true,
        },
      });
    }
    return BaseDatabase.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseDatabase.connection) {
      await BaseDatabase.connection.destroy();
      BaseDatabase.connection = null;
    }
  }
}
