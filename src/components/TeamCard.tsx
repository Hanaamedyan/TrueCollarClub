"use client";

type Props = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

export default function TeamCard({ name, role, quote, image }: Props) {
  return (
    <div style={{ width: "288px" }} className="bg-[#0F1F4B] text-white rounded-2xl flex-shrink-0 flex flex-col h-full">
      <div className="relative overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
        />
        <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-[#0F1F4B] to-transparent" />
      </div>
      <div className="px-4 pb-5 flex flex-col flex-1">
        <p className="font-medium border-b border-white/20 pb-4 text-sm leading-relaxed text-white/80 flex-1">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mt-4 font-bold text-white">— {name}</p>
        <p
          className="text-sm font-semibold"
          style={{
            background: "linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}
