import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string,
  SUPER_ADMIN_PASSWORD: string
}

const loadEnvVariables = (): EnvConfig => {
  const requiredVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",
    "JWT_EXPIRES_IN",
    "JWT_ACCESS_SECRET",
    "SUPER_ADMIN_PASSWORD",
    "SUPER_ADMIN_EMAIL"
  ];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing reqired enviroment variables ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string
  };
};

export const envVars = loadEnvVariables();
