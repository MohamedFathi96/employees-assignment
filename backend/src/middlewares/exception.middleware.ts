import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  // Set default status code and message
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  const response: any = { message };
  if (process.env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}
