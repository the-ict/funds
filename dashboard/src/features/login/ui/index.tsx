"use client"

import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="mb-8 w-12 h-12 bg-black rounded-lg flex items-center justify-center overflow-hidden">
        <div className="text-orange-500 font-bold text-xl">M</div>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Tizimga kirish
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed">
          Hisobingizga kirish uchun telefon raqamingizni kiriting
        </p>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              Telefon raqami
            </label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
              <span className="bg-gray-50 px-4 flex items-center text-gray-600 border-r border-gray-300 font-medium">
                +998
              </span>
              <input
                type="tel"
                id="phone"
                placeholder="00 000 00 00"
                className="w-full px-4 py-3 outline-none text-gray-800 placeholder-gray-300"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-[#2E3192] hover:bg-[#25287a] text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            Davom etish
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-[13px]">
          <MessageSquare size={16} className="text-green-500 fill-green-500" />
          <p className="text-gray-400">
            Tasdiqlash kodi <span className="text-green-500 font-medium cursor-pointer">@MablagBot</span> orqali yuboriladi
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;