import { EditEventForm } from "@/features/edit-event/ui/form";
import { UpdateEventSchema, trpc } from "@/shared/api";
import { useRouter } from "next/router";

export default function EditEvent() {
  const router = useRouter();
  const id = Number(router.query.id);

  const { data: event } = trpc.event.findUnique.useQuery({ id });
  const { mutate } = trpc.event.update.useMutation({
    onSuccess: () => {
      router.push(`/events/${id}`);
    },
  });

  const handleSubmit = (data: UpdateEventSchema) => {
    mutate({ id, data });
  };

  if (!event) return "Loading...";

  const defaultValues = {
    title: event.title,
    description: event.description || "",
    date: event.date.toISOString().split("T")[0],
  };

  return (
    <EditEventForm onSubmit={handleSubmit} defaultValues={defaultValues} />
  );
}
