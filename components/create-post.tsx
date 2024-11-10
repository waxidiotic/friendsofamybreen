"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createPostAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must not be blank" }),
  body: z.string().min(2, { message: "Body must not be blank" }),
});

export type CreatePostFormValues = z.infer<typeof formSchema>;

export const CreatePost = () => {
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (values: CreatePostFormValues) => {
    try {
      await createPostAction(values);
      toast.success("Post created successfully");
      setTimeout(() => {
        redirect("/");
      }, 1000);
    } catch (error) {
      toast.error("There was an error creating the post");
    }
  };

  return (
    <section className="py-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea rows={12} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Post</Button>
        </form>
      </Form>
    </section>
  );
};
