import { prisma } from "@/server/db";
import { CreateUserSchema } from "@/shared/api";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { router, procedure } from "@/server/trpc";

export const userRouter = router({
  create: procedure.input(CreateUserSchema).mutation(async ({ input }) => {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Пользователь с таким email уже существует",
      });
    }
    const hashedPassword = await bcryptjs.hash(input.password, 10);
    return prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    });
  }),
});
