import { EventDetail } from "@/entities/event";
import { trpc } from "@/shared/api";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Event() {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading } = trpc.event.findUnique.useQuery({
    id: Number(router.query.id),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (session.status === "unauthenticated") {
    return "Forbidden";
  }

  if (!data) {
    return "No data";
  }

  const isAuthor = data?.authorId === session.data?.user?.id;

  return (
    <>
      <EventDetail {...data} />
      {isAuthor && (
        <Link
          href={`/events/${router.query.id}/edit`}
          className="h-10 px-6 font-semibold rounded-md bg-black text-white"
        >
          Редактировать
        </Link>
      )}
    </>
  );
}
