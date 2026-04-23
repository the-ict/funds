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

export interface FilterState {
  search: string;
  type: 'all' | 'income' | 'expense';
  method: string;
}

interface TransactionFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onReset: () => void;
  children: React.ReactNode;
}

export function TransactionFilters({ filters, setFilters, onReset, children }: TransactionFiltersProps) {
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
              <Input
                placeholder="Turkum yoki izoh bo'yicha..."
                className="pl-9"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tranzaksiya turi</Label>
            <div className="flex gap-2">
              <Button
                variant={filters.type === 'all' ? 'default' : 'outline'}
                className="flex-1 cursor-pointer"
                onClick={() => setFilters({ ...filters, type: 'all' })}
              >
                Barchasi
              </Button>
              <Button
                variant={filters.type === 'income' ? 'default' : 'outline'}
                className="flex-1 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                onClick={() => setFilters({ ...filters, type: 'income' })}
              >
                Kirim
              </Button>
              <Button
                variant={filters.type === 'expense' ? 'default' : 'outline'}
                className="flex-1 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                onClick={() => setFilters({ ...filters, type: 'expense' })}
              >
                Chiqim
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>To'lov usuli</Label>
            <div className="flex flex-wrap gap-2">
              {["Plastik karta", "Naqd pul", "Bank o'tkazmasi"].map((m) => (
                <Button
                  key={m}
                  variant={filters.method === m ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilters({ ...filters, method: filters.method === m ? '' : m })}
                >
                  {m}
                </Button>
              ))}
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white flex gap-4">
          <Button variant="outline" className="flex-1" onClick={onReset}>Tozalash</Button>
          <SheetTrigger asChild>
            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">Qo'llash</Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}
