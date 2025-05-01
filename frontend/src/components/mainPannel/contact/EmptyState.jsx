export function EmptyState({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-10 text-gray-400">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm mt-2">{subtitle}</p>
    </div>
  );
}
