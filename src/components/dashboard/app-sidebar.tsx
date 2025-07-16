"use client";

import * as React from "react";
import { LogOut, Sprout, Users2 } from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useRouter } from "@bprogress/next";
import { logout } from "@/feature/admin/actions/admin";
import { toast } from "sonner";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Xyflo",
      logo: Sprout,
      plan: "Green Initiative",
    },
  ],
  navMain: [
    {
      title: "Doctor",
      url: "/",
      icon: Users2,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [pending, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton
            disabled={pending}
            onClick={() => {
              startTransition(async () => {
                const response = logout();
                toast.promise(response, {
                  loading: "Loading...",
                  success: (data) => {
                    if (!data.success) throw data.error;
                    router.replace("/login/admin");
                    return data.success;
                  },
                  error: (data) => {
                    return data.error;
                  },
                });
              });
            }}
          >
            <LogOut /> Logout
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
