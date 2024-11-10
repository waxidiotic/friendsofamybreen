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

const formSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  body: z.string({ required_error: "Body is required" }),
});

export type CreatePostFormValues = z.infer<typeof formSchema>;

export const CreatePost = () => {
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: CreatePostFormValues) => {
    const response = await createPostAction(values);
    console.log(response);
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
