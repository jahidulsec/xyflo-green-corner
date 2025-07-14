"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon } from "lucide-react";
import { useRouter } from "@bprogress/next";
import { usePathname, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";

function Search({
  placeholder = "Search...",
  type = "search",
}: {
  placeholder?: string;
  type?: string;
}) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const router = useRouter();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search) {
      params.set("search", search);
      params.delete("page");
    } else {
      params.delete("search");
      params.delete("page");
    }
    router.push(pathname + "?" + params.toString());
  };

  return (
    <form onSubmit={handleSubmit} className="relative shrink max-w-[8rem] sm:max-w-xl md:min-w-[8rem]">
      <Input
        type={type}
        name="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-8 pr-12 w-full text-sm"
        placeholder={placeholder}
      />
      <Label
        htmlFor="search"
        className="absolute top-[50%] -translate-y-[50%] left-3 text-muted-foreground/50"
      >
        <SearchIcon size={16} />
      </Label>
      <Button
        type="submit"
        size={"icon"}
        className="absolute right-0 top-0 rounded-l-none"
      >
        <SearchIcon size={16} />
      </Button>
    </form>
  );
}

export { Search as SearchForm };
