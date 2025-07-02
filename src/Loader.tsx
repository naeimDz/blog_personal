// components/ui/Loader.tsx

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center py-12">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
