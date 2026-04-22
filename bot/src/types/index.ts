import { Context } from "telegraf";

export type RegistrationStep = "name" | "phone" | "confirm" | "done";

export interface SessionState {
  step: RegistrationStep;
  data: {
    name?: string;
    phone?: string;
  };
}

export interface ValidationState {
  validatedName?: string | null;
  validatedPhone?: string | null;
  contactOwnerMismatch?: boolean;
  unsupportedPhoneInput?: boolean;
}

export interface BotContext extends Context {
  session?: SessionState;
  setSession: (session?: SessionState) => void;
  clearSession: () => void;
  state: Context["state"] & ValidationState;
}