import { memo } from "react";

const PostTags = memo(({ tags }: { tags: string[] }) => (
  <div className="flex gap-1.5 mb-3">
    {tags.slice(0, 3).map((tag, i) => (
      <span
        key={`${tag}-${i}`}
        className="px-2 py-0.5 text-xs text-blue-600 bg-blue-50 rounded-full"
      >
        {tag}
      </span>
    ))}
    {tags.length > 3 && (
      <span className="px-2 py-0.5 text-xs text-gray-500 bg-gray-50 rounded-full">
        +{tags.length - 3}
      </span>
    )}
  </div>
));

export default PostTags;