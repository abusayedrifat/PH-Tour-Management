import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_IN: string;
  BCRYPT_SALT_ROUND: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;
  EXPRESS_SESSION_SECRET: string;
  FRONTEND_URL: string;
  SSLCOMMERZ_STORE_ID: string;
  SSLCOMMERZ_STORE_PASS: string;
  SSLCOMMERZ_PAYMENT_API: string;
  SSLCOMMERZ_VALIDATION_API: string;
  SSLCOMMERZ_SUCCESS_BACKEND_URL: string,
  SSLCOMMERZ_FAIL_BACKEND_URL: string,
  SSLCOMMERZ_CANCEL_BACKEND_URL: string,
  SSLCOMMERZ_SUCCESS_FRONTEND_URL: string,
  SSLCOMMERZ_FAIL_FRONTEND_URL: string,
  SSLCOMMERZ_CANCEL_FRONTEND_URL: string,
  CLOUDINARY_CLOUD_NAME: string,
  CLOUDINARY_CLOUD_API_KEY: string,
  CLOUDINARY_CLOUD_API_SECRET: string,
  SMTP_HOST: string,
  SMTP_PORT: string,
  SMTP_USER: string,
  SMTP_PASS: string,
  SMTP_FROM: string,
  REDIS_USER: string
  REDIS_PASS: string
  REDIS_HOST: string
  REDIS_PORT: string
}

const loadEnvVariables = (): EnvConfig => {
  const requiredVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",
    "JWT_EXPIRES_IN",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_IN",
    "JWT_REFRESH_SECRET",
    "SUPER_ADMIN_PASSWORD",
    "SUPER_ADMIN_EMAIL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION_SECRET",
    "FRONTEND_URL",
    "SSLCOMMERZ_STORE_ID",
    "SSLCOMMERZ_STORE_PASS",
    "SSLCOMMERZ_PAYMENT_API",
    "SSLCOMMERZ_VALIDATION_API",
    "SSLCOMMERZ_SUCCESS_BACKEND_URL",
    "SSLCOMMERZ_FAIL_BACKEND_URL",
    "SSLCOMMERZ_CANCEL_BACKEND_URL",
    "SSLCOMMERZ_SUCCESS_FRONTEND_URL",
    "SSLCOMMERZ_FAIL_FRONTEND_URL",
    "SSLCOMMERZ_CANCEL_FRONTEND_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_CLOUD_API_KEY",
    "CLOUDINARY_CLOUD_API_SECRET",
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "REDIS_USER",
    "REDIS_PASS",
    "REDIS_HOST",
    "REDIS_PORT",
  ];

  requiredVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing reqired enviroment variables ${key}`);
    }
  });

  return {
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_IN: process.env.JWT_REFRESH_IN as string,
    PORT: process.env.PORT as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID as string,
    SSLCOMMERZ_STORE_PASS: process.env.SSLCOMMERZ_STORE_PASS as string,
    SSLCOMMERZ_PAYMENT_API: process.env.SSLCOMMERZ_PAYMENT_API as string,
    SSLCOMMERZ_VALIDATION_API: process.env.SSLCOMMERZ_VALIDATION_API as string,
    SSLCOMMERZ_SUCCESS_BACKEND_URL: process.env.SSLCOMMERZ_SUCCESS_BACKEND_URL as string,
    SSLCOMMERZ_FAIL_BACKEND_URL: process.env.SSLCOMMERZ_FAIL_BACKEND_URL as string,
    SSLCOMMERZ_CANCEL_BACKEND_URL: process.env.SSLCOMMERZ_CANCEL_BACKEND_URL as string,
    SSLCOMMERZ_SUCCESS_FRONTEND_URL: process.env.SSLCOMMERZ_SUCCESS_FRONTEND_URL as string,
    SSLCOMMERZ_FAIL_FRONTEND_URL: process.env.SSLCOMMERZ_FAIL_FRONTEND_URL as string,
    SSLCOMMERZ_CANCEL_FRONTEND_URL: process.env.SSLCOMMERZ_CANCEL_FRONTEND_URL as string,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
    CLOUDINARY_CLOUD_API_KEY: process.env.CLOUDINARY_CLOUD_API_KEY as string,
    CLOUDINARY_CLOUD_API_SECRET: process.env.CLOUDINARY_CLOUD_API_SECRET as string,
    SMTP_HOST: process.env.SMTP_HOST as string,
    SMTP_PORT: process.env.SMTP_PORT as string,
    SMTP_USER: process.env.SMTP_USER as string,
    SMTP_PASS: process.env.SMTP_PASS as string,
    SMTP_FROM: process.env.SMTP_FROM as string,
    REDIS_USER: process.env.REDIS_USER as string,
    REDIS_PASS: process.env.REDIS_PASS as string,
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: process.env.REDIS_PORT as string,
  };
};

export const envVars = loadEnvVariables();
