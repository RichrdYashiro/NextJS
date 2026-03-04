import { CreateEventSchema, JoinEventSchema, LeaveEventSchema, UpdateEventSchema  } from "@/shared/api";
import { prisma } from "../db";
import { isAuth, procedure, router } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const eventRouter = router({
  findMany: procedure.query(async ({ ctx: { user } }) => {
    const events = await prisma.event.findMany({
      include: {
        participations: true,
      },
    });

    return events.map(({ participations, ...event }) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id),
    }));
  }),

  findUnique: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .use(isAuth)
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: input,
        select: {
          authorId: true,
          title: true,
          description: true,
          date: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  create: procedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.event.create({
        data: {
          authorId: user.id,
          ...input,
        },
      });
    }),
      update: procedure
  .input(z.object({ id: z.number(), data: UpdateEventSchema }))
   .use(isAuth)
   .mutation(async({input, ctx: {user}}) =>{
  const event = await prisma.event.findUnique({
  where: { id: input.id },
    });
    if (!event || event.authorId !== user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
  return prisma.event.update({

      where: { id: input.id },
      data: input.data,
    });
   }),
  leave: procedure
   .input(LeaveEventSchema)
    .use(isAuth)
   .mutation(({input, ctx: {user}}) =>{
    return prisma.participation.delete({
      where: {
        userId_eventId: {
          eventId: input.id,
          userId: user.id,
        },
      },
    })
   }),
  join: procedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      });
    }),
});
