export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <div className="align-center flex flex-col justify-center p-4 pt-4 sm:gap-8 sm:p-8 sm:pt-4">
      <button className="w-full self-end rounded bg-purple-600 px-14 py-1 text-xl font-bold text-purple-100 transition-all duration-100 hover:bg-purple-500 active:scale-95 active:bg-purple-700 sm:text-2xl">
        {children}
      </button>
    </div>
  );
}
