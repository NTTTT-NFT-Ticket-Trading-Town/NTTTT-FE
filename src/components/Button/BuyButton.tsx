export default function BuyButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="align-center sticky bottom-0 flex grow flex-col justify-center gap-4 p-4 pt-4 sm:gap-8 sm:p-8 sm:pt-4">
      <button className="w-full self-end rounded bg-purple-600 py-2 text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 sm:py-4 sm:text-2xl">
        {children}
      </button>
      <div className="absolute -inset-0 -z-10 animate-pulse bg-purple-300 px-4 blur-xl sm:inset-2"></div>
    </div>
  );
}
