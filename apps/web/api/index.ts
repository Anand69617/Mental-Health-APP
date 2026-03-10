import { handle } from '@hono/vercel';
import { vercelApp } from '../__create/index';

// This wraps your Hono app into a Vercel Serverless Function
export const GET = handle(vercelApp);
export const POST = handle(vercelApp);
export const PUT = handle(vercelApp);
export const PATCH = handle(vercelApp);
export const DELETE = handle(vercelApp);