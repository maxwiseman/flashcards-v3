"use client";

import Link from "next/link";
import {
  IconLogout,
  IconMoonStars,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Image } from "@/components/ui/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Navbar(): React.ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="bg-red justify-apart sticky top-0 flex h-20 w-full items-center gap-4 border-b-[1px] border-border bg-background p-5 px-8">
      <div className="flex h-full w-full flex-row items-center gap-4">
        <Image
          alt="Logo"
          className="h-full w-36 object-contain"
          src="/logo.svg"
        />
        <Link href="/">Home</Link>
        <Link href="/">Sets</Link>
        <Link href="/">Settings</Link>
        <Link href="/">Dashboard</Link>
      </div>
      {/* <Button>Sign Up</Button> */}
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          <Avatar>
            <AvatarFallback>MW</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="pb-0">Max Wiseman</DropdownMenuLabel>
          <DropdownMenuLabel className="line-clamp-1 pt-0 text-xs font-normal text-muted-foreground">
            max@maxwiseman.io
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              redirect("/app/settings");
            }}
          >
            <IconSettings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconUser className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconMoonStars className="mr-2 h-4 w-4" /> Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onClick={() => {
                    setTheme("system");
                  }}
                >
                  {/* <IconDeviceDesktop className="mr-2 h-4 w-4" /> */}
                  System
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onClick={() => {
                    setTheme("light");
                  }}
                >
                  {/* <IconSun className="mr-2 h-4 w-4" /> */}
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onClick={() => {
                    setTheme("dark");
                  }}
                >
                  {/* <IconMoon className="mr-2 h-4 w-4" /> */}
                  Dark
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut({ redirect: true, callbackUrl: "/" });
            }}
          >
            <IconLogout className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
