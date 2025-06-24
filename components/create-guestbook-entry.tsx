"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { createGuestbookEntryAction } from "@/app/actions";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters" }),
});

export type CreateGuestbookEntryFormValues = z.infer<typeof formSchema>;

export const CreateGuestbookEntry = () => {
  const form = useForm<CreateGuestbookEntryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = async (values: CreateGuestbookEntryFormValues) => {
    try {
      await createGuestbookEntryAction(values);
      toast.success("Guestbook entry posted successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("There was an error posting your message");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="w-1/2">
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <div className="w-full">
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your message"
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <Button type="submit" className="self-end" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
