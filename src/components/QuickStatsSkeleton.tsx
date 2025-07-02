export default function QuickStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-gray-100 p-4 rounded-xl shadow animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
          <div className="h-6 bg-gray-400 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
