// Vercel serverless entry point. Vercel routes every /api/* request here (see
// vercel.json) and Express matches on the original, unrewritten path.
import app from "../Server/src/app.js";

export default app;
