import { EventCard } from "@/entities/event";
import { JoinEventButton } from "@/features/join-event";
import { LeaveEventButton } from "@/features/leave-event/ui/button";
import { trpc } from "@/shared/api";

export default function Home() {
  const { data, refetch } = trpc.event.findMany.useQuery();

  return (
    <div className="min-h-screen bg-[#0a0a0b] py-20 px-6">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Предстоящие события<span className="text-indigo-500">.</span>
        </h1>
        <p className="mt-2 text-gray-400 text-lg">
          Выбирайте лучшее и присоединяйтесь
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {data.map((event) => (
              <div
                key={event.id}
                className="transition-all duration-300 hover:-translate-y-2"
              >
                <EventCard
                  {...event}
                  action={
                    event.isJoined ? (
                      <LeaveEventButton
                        eventId={event.id}
                        onSuccess={refetch}
                      />
                    ) : (
                      <JoinEventButton eventId={event.id} onSuccess={refetch} />
                    )
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500 text-lg">
              Пока ничего не запланировано...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
