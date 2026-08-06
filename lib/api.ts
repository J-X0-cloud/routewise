import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export interface ApiErrorBody {
  error: { code: string; message: string; details?: unknown };
}

export function ok<T>(data: T, init?: ResponseInit): NextResponse<T> {
  return NextResponse.json(data, init);
}

export function apiError(
  status: number,
  code: string,
  message: string,
  details?: unknown,
): NextResponse<ApiErrorBody> {
  return NextResponse.json({ error: { code, message, details } }, { status });
}

export function validationError(error: ZodError): NextResponse<ApiErrorBody> {
  return apiError(422, "validation_failed", "The request body is invalid.", error.flatten());
}

/** Parses a JSON body without throwing on malformed input. */
export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}
