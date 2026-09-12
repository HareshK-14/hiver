// SupportLens AI — Request Logger Middleware
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      requestId: string;
      startTime: number;
    }
  }
}

export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  req.requestId = uuidv4();
  req.startTime = Date.now();

  console.log(JSON.stringify({
    level: 'info',
    ts: new Date().toISOString(),
    msg: 'incoming_request',
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    ip: req.ip,
  }));

  next();
}
