// SupportLens AI — Backend Entry Point
import 'dotenv/config';
import { createApp } from './app';

const PORT = parseInt(process.env.PORT ?? '3001', 10);

const app = createApp();

app.listen(PORT, () => {
  console.log(JSON.stringify({
    level: 'info',
    ts: new Date().toISOString(),
    msg: 'SupportLens AI backend started',
    port: PORT,
    env: process.env.NODE_ENV ?? 'development',
  }));
});
