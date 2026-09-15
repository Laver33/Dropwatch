import { S } from "fluent-json-schema";
import type { FromSchema } from "json-schema-to-ts";

export const registerBodySchema = S.object()
  .prop("email", S.string().format("email").required())
  .prop("password", S.string().maxLength(100).minLength(8).required())
  .valueOf();

// Для Ts типизации
export type Register = FromSchema<typeof registerBodySchema> & {
  email: string;
  password: string;
};
