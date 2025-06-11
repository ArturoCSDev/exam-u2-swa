import { SessionService } from "./session.service";
import type { User } from "@/features/auth/types/auth.types";

// Creamos una instancia específica para autenticación con el tipo User
export const authSessionService = new SessionService<User>({
  tokenKey: "auth_token",
  userKey: "auth_user",
});
