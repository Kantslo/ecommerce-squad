"use client";

import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RANGE_OPTIONS } from "@/lib/rangeOptions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type ChartCardProps = {
  title: string;
  children: ReactNode;
  queryKey: string;
  selectedRangeLabel: string;
};

export function ChartCard({
  title,
  children,
  queryKey,
  selectedRangeLabel,
}: ChartCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  function setRange(range: keyof typeof RANGE_OPTIONS) {
    const params = new URLSearchParams(searchParams);
    params.set(queryKey, range);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex ga[-4 justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{selectedRangeLabel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(RANGE_OPTIONS).map(([key, value]) => (
                <DropdownMenuItem
                  onClick={() => setRange(key as keyof typeof RANGE_OPTIONS)}
                  key={key}>
                  {value.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
