// SupportLens AI — Global Error Handler Middleware
import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  console.error(JSON.stringify({
    level: 'error',
    ts: new Date().toISOString(),
    msg: 'unhandled_error',
    requestId: req.requestId,
    statusCode,
    error: err.message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  }));

  res.status(statusCode).json({
    error: message,
    requestId: req.requestId,
  });
}
