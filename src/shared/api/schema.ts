import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});

export const UpdateEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.coerce.date(),
});


export const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password:  z.string(),
});



export type UpdateEventSchema = z.infer<typeof UpdateEventSchema>;

export type CreateEventSchema = z.infer<typeof CreateEventSchema>;

export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const JoinEventSchema = z.object({
  id: z.number().int().positive(),
});

export const LeaveEventSchema = z.object({
  id: z.number().int().positive(),
});