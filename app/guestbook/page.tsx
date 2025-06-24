import { CreateGuestbookEntry } from "@/components/create-guestbook-entry";
import { PageTitle } from "@/components/page-title";

export default function GuestbookPage() {
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
      <div className="flex flex-col gap-2 items-start">
        <h6 className="text-sm text-muted-foreground">
          From <span className="font-bold text-foreground">John Doe</span>
        </h6>
        <p className="text-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
    </div>
  );
}
