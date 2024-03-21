

import { z } from "zod";

export const _AdminModel = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
});
