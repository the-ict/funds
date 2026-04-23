"use client"

import React, {
  useState,
  useRef
} from 'react';
import {
  Shield,
  Info,
  Lock
} from 'lucide-react';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background soft glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

      {/* Main Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 z-10">
        <div className="flex flex-col items-center">
          <div className="mb-6 w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center">
            <Shield className="text-[#2E3192] w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold text-[#1e1b4b] mb-3">
            Kodni tasdiqlang
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8 leading-relaxed max-w-[280px]">
            6 xonali tasdiqlash kodi Telegram orqali <span className="text-[#2E3192] font-semibold cursor-pointer">@MablagBot</span> botiga yuborildi.
          </p>

          {/* OTP Inputs */}
          <div className="flex gap-2 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => { inputRefs.current[index] = el; }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-10 h-14 md:w-12 md:h-16 border-2 rounded-xl text-center text-xl font-bold outline-none transition-all ${index === 0 && !data ? 'border-blue-600 ring-1 ring-blue-100' : 'border-gray-100'
                  } focus:border-blue-600 focus:ring-1 focus:ring-blue-100`}
              />
            ))}
          </div>

          <button className="cursor-pointer w-full bg-[#2E3192] hover:bg-[#25287a] text-white font-semibold py-4 rounded-xl transition-colors mb-6">
            Tasdiqlash
          </button>

          <button className="cursor-pointer text-[#2E3192] font-medium text-sm hover:underline">
            Kodni qayta yuborish
          </button>
        </div>
      </div>

      {/* Center Footer Text */}
      <div className="mt-8 text-center space-y-2">
        <p className="text-gray-500 text-sm">
          Muammo yuzaga keldimi? <span className="text-[#2E3192] font-semibold cursor-pointer">Qo'llab-quvvatlash markazi</span>
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-bold tracking-widest uppercase">
          <Lock size={12} />
          Xavfsiz ulanish
        </div>
      </div>

      {/* Security Toast (Bottom Right) */}
      <div className="hidden lg:flex fixed bottom-10 right-10 max-w-xs bg-white/80 backdrop-blur-md border border-gray-100 p-5 rounded-2xl shadow-lg items-start gap-4">
        <div className="bg-green-100 p-2 rounded-lg">
          <Info className="text-green-600 w-5 h-5" />
        </div>
        <div>
          <h4 className="text-[#1e1b4b] font-bold text-sm mb-1">Xavfsizlik eslatmasi</h4>
          <p className="text-gray-500 text-[13px] leading-snug">
            Tasdiqlash kodini hech qachon uchinchi shaxslarga bermang. Mablag' xodimlari buni so'ramaydi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;