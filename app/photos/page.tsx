import { PhotoThumbnail } from "@/components/photo-thumbnail";
import { getPublicImages } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export default async function PhotosPage() {
  const supabase = await createClient();
  const images = await getPublicImages(supabase);

  return (
    <main className="mb-auto">
      <div className="divide-y divide-muted-foreground">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-light text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Photos
          </h1>
        </div>
        <ul className="gap-5 columns-1 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>li:not(:first-child)]:mt-8 pt-8">
          {images?.map(
            (img) =>
              img?.secure_url && (
                <PhotoThumbnail key={img.public_id} image={img} />
              )
          )}
        </ul>
      </div>
    </main>
  );
}
