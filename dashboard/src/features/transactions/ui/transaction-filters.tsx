"use client";

import {
  Search
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import {
  Button
} from "@/shared/ui/button";
import {
  Input
} from "@/shared/ui/input";
import {
  Label
} from "@/shared/ui/label";

export function TransactionFilters({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-6">
        <SheetHeader>
          <SheetTitle>Filtrlar</SheetTitle>
          <SheetDescription>
            Tranzaksiyalarni qidirish va saralash uchun filtrlarni sozlang.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label>Qidiruv</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input placeholder="Turkum yoki izoh bo'yicha..." className="pl-9" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tranzaksiya turi</Label>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Barchasi</Button>
              <Button variant="outline" className="flex-1 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200">Kirim</Button>
              <Button variant="outline" className="flex-1 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">Chiqim</Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sana oralig'i</Label>
            <div className="flex items-center gap-2">
              <Input type="date" />
              <span className="text-slate-400">-</span>
              <Input type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>To'lov usuli</Label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Plastik karta</Button>
              <Button variant="outline" size="sm">Naqd pul</Button>
              <Button variant="outline" size="sm">Bank o'tkazmasi</Button>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white flex gap-4">
          <Button variant="outline" className="flex-1">Tozalash</Button>
          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">Qo'llash</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
