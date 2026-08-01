"use client";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export default function TeamCard({ name, role, quote, image }: Props) {
  return (
    <div className={cn("w-72 bg-[#0F1F4B] text-white rounded-2xl flex-shrink-0")}>
      <div className="relative -mt-px overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={name}
          className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
        />
        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-[#0F1F4B] to-transparent" />
      </div>
      <div className="px-4 pb-5">
        <p className="font-medium border-b border-white/20 pb-4 text-sm leading-relaxed text-white/80">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mt-4 font-bold text-white">— {name}</p>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] text-transparent bg-clip-text">
          {role}
        </p>
      </div>
    </div>
  );
}
