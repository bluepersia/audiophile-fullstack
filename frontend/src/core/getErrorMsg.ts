import AppError from "../types/AppError";

export default function getErrorMsg(err: Error): string {
  if (err instanceof AppError) return err.message;
  return "Something went wrong. Please try again.";
}
