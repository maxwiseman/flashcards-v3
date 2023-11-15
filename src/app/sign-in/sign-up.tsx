"use client";

import { IconLoader } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function SignUp(): React.ReactElement {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Invalid name",
    }),
    email: z.string().min(2, {
      message: "Invalid email",
    }),
    password: z.string().min(2, {
      message: "Invalid password",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackUrl");

  return (
    <div className="overflow-scroll">
      <div className="flex items-center justify-between gap-5">
        <Button
          className="h-12 grow"
          onClick={async () => {
            await signIn("apple", {
              redirect: true,
              callbackUrl: callbackURL || "/",
            });
          }}
          size="icon"
          variant="outline"
        >
          <Image
            alt="Apple Logo"
            className="h-5 w-5 object-contain dark:invert"
            height={20}
            src="/logos/apple.svg"
            width={20}
          />
        </Button>
        <Button
          className="h-12 grow"
          onClick={async () => {
            await signIn("github", {
              redirect: true,
              callbackUrl: callbackURL || "/",
            });
          }}
          size="icon"
          variant="outline"
        >
          <Image
            alt="Github Logo"
            className="h-5 w-5 object-contain dark:invert"
            height={20}
            src="/logos/github.svg"
            width={20}
          />
        </Button>
        <Button
          className="h-12 grow"
          onClick={async () => {
            await signIn("google", {
              redirect: true,
              callbackUrl: callbackURL || "/",
            });
          }}
          size="icon"
          variant="outline"
        >
          <Image
            alt="Google Logo"
            className="h-5 w-5 object-contain dark:invert"
            height={20}
            src="/logos/google.svg"
            width={20}
          />
        </Button>
      </div>
      <div className="my-6 flex w-full flex-nowrap items-center justify-center">
        <Separator className="shrink" />
        <p className="mx-3 flex h-2 items-center justify-center text-muted-foreground">
          or
        </p>
        <Separator className="shrink" />
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(
            async (values: { email: string; password: string }) => {
              try {
                setLoading(true);
                await signIn("credentials", {
                  email: values.email,
                  password: values.password,
                  redirect: true,
                  callbackUrl: callbackURL || "/",
                }).then(() => {
                  setLoading(false);
                });
              } catch (err: unknown) {
                console.error("error", err);
                toast.error("Something went wrong!", {
                  // @ts-expect-error -- If it doesn't work, it's not the end of the world
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- If this doesn't work, it's fine
                  description: err.errors[0].longMessage,
                });
                setLoading(false);
              }
            },
          )}
        >
          <FormField
            control={form.control}
            name="name"
            render={(): React.ReactElement => {
              return (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-primary"
                      disabled={loading}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={(): React.ReactElement => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-primary"
                      disabled={loading}
                      placeholder="example@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={(): React.ReactElement => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-primary"
                      disabled={loading}
                      placeholder="SecurePassword123"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button disabled={loading} type="submit">
            {loading ? <IconLoader className="h-4 w-4 animate-spin" /> : null}
            Sign up
          </Button>
        </form>
      </Form>
    </div>
  );
}
