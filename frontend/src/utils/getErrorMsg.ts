import AppError from "../types/AppError";

export default function getErrorMsg(err: Error): string {
  return err instanceof AppError
    ? err.message
    : "Something went wrong. Please try again.";
}
