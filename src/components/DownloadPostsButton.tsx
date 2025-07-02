import { Post } from "../types/posts";

interface DownloadPostsButtonProps {
  posts: Post[];
}

export default function DownloadPostsButton({ posts }: DownloadPostsButtonProps) {
  const handleDownload = () => {
    const json = JSON.stringify(posts, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "posts.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
    >
      Download JSON
    </button>
  );
}
