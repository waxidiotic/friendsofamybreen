import { CreateGuestbookEntry } from "@/components/create-guestbook-entry";
import { PageTitle } from "@/components/page-title";
import { createClient } from "@/utils/supabase/server";

export default async function GuestbookPage() {
  const supabase = await createClient();
  const { data: guestbookEntries } = await supabase
    .from("guestbook_entries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <PageTitle title="Guestbook" />
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Guestbook</h2>
        <p className="text-sm text-muted-foreground">
          Leave a message for the family
        </p>
      </div>
      <CreateGuestbookEntry />
      {guestbookEntries?.length === 0 && (
        <p className="text-muted-foreground">
          No messages yet. Be the first to leave a message!
        </p>
      )}
      {guestbookEntries?.map((entry) => (
        <div key={entry.id} className="flex flex-col gap-2 items-start">
          <h6 className="text-sm text-muted-foreground">
            From <span className="font-bold text-foreground">{entry.name}</span>
          </h6>
          <p className="text-foreground">{entry.message}</p>
        </div>
      ))}
    </div>
  );
}
