"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createPostAction } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { TextEditor } from "./text-editor";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must not be blank" }),
  body: z.string().min(2, { message: "Body must not be blank" }),
  body_json: z.any(),
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
    if (values.body.length < 10) {
      form.setError("body", { message: "Body must not be blank" });
      return;
    }

    try {
      await createPostAction(values);
      toast.success("Post created successfully");
      setTimeout(() => {
        redirect("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("There was an error creating the post");
    }
  };

  return (
    <section>
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
            render={() => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Controller
                    name="body"
                    control={form.control}
                    render={() => <TextEditor setValue={form.setValue} />}
                  />
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
