"use client";

import { useState } from "react";
import { useLogin, useVerifyOTP } from "../../../shared/config/react-query/hooks";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const loginMutation = useLogin();
  const verifyMutation = useVerifyOTP();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ phone }, {
      onSuccess: () => {
        setStep("otp");
      },
      onError: (err: any) => {
        alert("Xatolik yuz berdi: " + err.message);
      }
    });
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyMutation.mutate({ phone, code }, {
      onSuccess: () => {
        alert("Tizimga muvaffaqiyatli kirdingiz!");
        window.location.href = "/";
      },
      onError: (err: any) => {
        alert("Xatolik yuz berdi: " + err.message);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Tizimga kirish</h2>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon raqam</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {loginMutation.isPending ? "Yuborilmoqda..." : "Kodni yuborish"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tasdiqlash kodi</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="0000"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-center tracking-widest text-lg font-bold"
                required
              />
            </div>
            <button
              type="submit"
              disabled={verifyMutation.isPending}
              className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {verifyMutation.isPending ? "Tasdiqlanmoqda..." : "Tasdiqlash"}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-indigo-600 font-semibold py-2 rounded-xl hover:bg-indigo-50 transition-colors text-sm"
            >
              Raqamni o'zgartirish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
