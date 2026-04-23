"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Transaction } from "@/shared/lib/mockData";

interface TransactionModalProps {
  mode: "add" | "edit";
  transaction?: Transaction;
  children: React.ReactNode;
}

export function TransactionModal({ mode, transaction, children }: TransactionModalProps) {
  const [open, setOpen] = useState(false);

  const isEdit = mode === "edit";
  const defaultValues = isEdit && transaction ? {
    type: transaction.type,
    amount: Math.abs(transaction.amount).toString(),
    category: transaction.category,
    method: transaction.method,
    date: transaction.date,
    description: transaction.description,
  } : {
    type: "expense",
    amount: "",
    category: "",
    method: "Plastik karta",
    date: new Date().toISOString().split('T')[0],
    description: "",
  };

  const [formData, setFormData] = useState(defaultValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting transaction:", formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Tranzaksiyani tahrirlash" : "Yangi tranzaksiya qo'shish"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Tranzaksiya ma'lumotlarini o'zgartiring." : "Yangi daromad yoki xarajatni kiriting."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="flex gap-4">
            <Button
              type="button"
              variant={formData.type === "expense" ? "destructive" : "outline"}
              className="flex-1"
              onClick={() => setFormData({ ...formData, type: "expense" })}
            >
              Chiqim
            </Button>
            <Button
              type="button"
              variant={formData.type === "income" ? "default" : "outline"}
              className={formData.type === "income" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              onClick={() => setFormData({ ...formData, type: "income" })}
            >
              Kirim
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Miqdor</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Turkum</Label>
            <Input
              id="category"
              placeholder="Masalan: Tushlik"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">To'lov usuli</Label>
            <Select
              value={formData.method}
              onValueChange={(val) => setFormData({ ...formData, method: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="To'lov usulini tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Plastik karta">Plastik karta</SelectItem>
                <SelectItem value="Naqd pul">Naqd pul</SelectItem>
                <SelectItem value="Bank o'tkazmasi">Bank o'tkazmasi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Sana</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Izoh</Label>
            <Input
              id="description"
              placeholder="Tranzaksiya haqida qisqacha..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              {isEdit ? "Saqlash" : "Qo'shish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
