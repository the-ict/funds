"use client";

import { useState } from "react";
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
import { Transaction } from "@/shared/config/api/types";
import { useCreateTransaction, useUpdateTransaction, useDeleteTransaction, useCategories, useCreateCategory } from "@/shared/config/react-query/hooks";
import { Loader2, Trash2, PlusCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface TransactionModalProps {
  mode: "add" | "edit";
  transaction?: Transaction;
  initialType?: "income" | "expense";
  children: React.ReactNode;
}

type initialType = "income" | "expense";

export function TransactionModal({ mode, transaction, children }: TransactionModalProps) {
  const [open, setOpen] = useState(false);

  const isEdit = mode === "edit";
  const [formData, setFormData] = useState(isEdit && transaction ? {
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
  });

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();
  const { data: categories, isLoading: isCatsLoading } = useCategories();
  const createCategoryMutation = useCreateCategory();

  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);
    const categoryName = isAddingNewCategory ? newCategoryName : formData.category;

    const data = {
      ...formData,
      category: categoryName,
      amount: formData.type === 'expense' ? -Math.abs(amount) : Math.abs(amount)
    };

    if (isAddingNewCategory) {
      createCategoryMutation.mutate({ name: newCategoryName, type: formData.type });
    }

    if (isEdit && transaction) {
      updateMutation.mutate({ id: transaction.id, data: data as Transaction }, {
        onSuccess: () => {
          setOpen(false);
          setIsAddingNewCategory(false);
          setNewCategoryName("");
        }
      });
    } else {
      createMutation.mutate(data as Transaction, {
        onSuccess: () => {
          setOpen(false);
          setIsAddingNewCategory(false);
          setNewCategoryName("");
        }
      });
    }
  };

  const handleDelete = () => {
    if (isEdit && transaction) {
      if (confirm("Haqiqatan ham ushbu tranzaksiyani o'chirmoqchimisiz?")) {
        deleteMutation.mutate(transaction.id, {
          onSuccess: () => setOpen(false)
        });
      }
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

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
              className={cn("flex-1", "cursor-pointer")}
              onClick={() => setFormData({ ...formData, type: "expense" })}
            >
              Chiqim
            </Button>
            <Button
              type="button"
              variant={formData.type === "income" ? "default" : "outline"}
              className={cn(formData.type === "income" ? "bg-emerald-600 hover:bg-emerald-700" : "", "cursor-pointer")}
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
            {isAddingNewCategory ? (
              <div className="flex gap-2">
                <Input
                  id="category"
                  placeholder="Yangi turkum nomi..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingNewCategory(false)}
                >
                  Bekor
                </Button>
              </div>
            ) : (
              <Select
                value={formData.category}
                onValueChange={(val) => {
                  if (val === "ADD_NEW") {
                    setIsAddingNewCategory(true);
                  } else {
                    setFormData({ ...formData, category: val });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Turkumni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.filter(c => c.type === formData.type).map((c) => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                  <SelectItem value="ADD_NEW" className="text-indigo-600 font-bold">
                    <div className="flex items-center gap-2">
                      <PlusCircle size={14} />
                      Yangi qo'shish
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
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

          <DialogFooter className="gap-2 sm:gap-0">
            {isEdit && (
              <Button
                type="button"
                variant="outline"
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                onClick={handleDelete}
                disabled={isLoading}
              >
                <Trash2 size={16} className="mr-2" />
                O'chirish
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                Bekor qilish
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? "Saqlash" : "Qo'shish"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
