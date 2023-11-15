"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Setting } from "@/components/ui/setting";

export function NewButton(): React.ReactElement {
  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is fine
    resolver: zodResolver<any>(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New Card Set</DialogTitle>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <Setting
              form={form}
              label="Title"
              name="title"
              placeholder="Vocabulary"
            >
              <Input />
            </Setting>
            <Setting
              form={form}
              label="Description"
              name="description"
              placeholder="Module 2 Day 1 Vocabulary"
            >
              <Textarea />
            </Setting>
          </form>
        </Form>
        <DialogFooter>
          <Button disabled type="submit">
            <Loader className="h-4 w-4 animate-spin" /> Create
          </Button>
          <DialogClose asChild>
            <Button type="reset" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
