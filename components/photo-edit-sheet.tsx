"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "./ui/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "@/types";
import { Form, FormDescription, FormField, FormLabel } from "./ui/form";
import { updateImageDetailsAction } from "@/app/actions";
import { toast } from "sonner";

const formSchema = z.object({
  visibility: z.boolean(),
  description: z.string(),
});

export type PhotoEditFormValues = z.infer<typeof formSchema>;
interface PhotoEditSheetProps {
  image: Image;
}

export const PhotoEditSheet = ({ image }: PhotoEditSheetProps) => {
  const form = useForm<PhotoEditFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visibility: image.visibility,
      description: image.display_name ?? "",
    },
  });

  const onSubmit = async (values: PhotoEditFormValues) => {
    if (!image.public_id) return null;

    try {
      await updateImageDetailsAction({
        id: image.public_id,
        data: values,
      });
      toast.success("Photo updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("There was an error updating the photo");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button type="button" variant="outline">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit photo</SheetTitle>
          <SheetDescription>
            Make changes to the photo here. Click save when you are done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8 py-4">
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel htmlFor="name" className="text-right col-span-1">
                      Visibility
                    </FormLabel>
                    <Switch
                      className="col-span-3"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FormDescription className="col-start-2 col-span-3">
                      This photo {field.value ? "is" : "is not"} visible to the
                      public.
                    </FormDescription>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Description
                    </Label>
                    <Input id="description" className="col-span-3" {...field} />
                  </div>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
