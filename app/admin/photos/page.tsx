import { PageTitle } from "@/components/page-title";
import { PhotoEditSheet } from "@/components/photo-edit-sheet";
import { PhotoThumbnail } from "@/components/photo-thumbnail";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllImages } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export default async function PhotosAdminPage() {
  const supabase = await createClient();
  const images = await getAllImages(supabase);

  return (
    <>
      <PageTitle title="Photos Admin" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date Added</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images?.length ? (
            images.map((image) => (
              <TableRow key={image.asset_id}>
                <TableCell>
                  {new Date(image.created_at).toDateString()}
                </TableCell>
                <TableCell>
                  <PhotoThumbnail image={image} width={100} height={100} />
                </TableCell>
                <TableCell>{image.display_name}</TableCell>
                <TableCell>
                  {image.visibility ? (
                    <span className="text-green-700">Visible</span>
                  ) : (
                    <span className="text-red-700">Not Visible</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <PhotoEditSheet image={image} />
                    <Button type="button" variant="destructive">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No images found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
