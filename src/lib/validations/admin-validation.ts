
import { _AdminModel as AdminModel } from "@voosh/utils/zod/admin-zod-model";
import { z } from "zod";


export const schemaAdminBaseBodyParams = AdminModel.pick({
    id: true,
    email: true,
    username: true,
    password: true,
}).partial();



const schemaAdminEditParams = z.object({
    email: z.string().email().toLowerCase().optional(),
    username: z.string().optional(),
    password: z.string().min(6).optional(),
});

const schemaAdminCreateParams = z.object({
    email: z.string().email().toLowerCase(),
    username: z.string(),
    password: z.string().min(6),
  });

  export const schemaAdminEditBodyParams = schemaAdminBaseBodyParams
  .merge(schemaAdminEditParams)
  .omit({})
  .partial()
  .strict();

export const schemaAdminCreateBodyParams = schemaAdminBaseBodyParams
  .merge(schemaAdminCreateParams)
  .omit({})
  .strict();


  export const schemaAdminReadPublic = AdminModel.pick({
    id: true,
    email: true,
    username: true,
}).partial();