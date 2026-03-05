import { router } from "../trpc";
import { eventRouter } from "./event";
import { userRouter } from "./register";

export const appRouter = router({
  event: eventRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
