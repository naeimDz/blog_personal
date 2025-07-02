import { Heart, Calendar, Clock, ExternalLink} from "lucide-react";
import { Post, PostStatus } from "../types/posts";
import { getPriorityColor, getStatusColor } from "../utils/helpers";
import { memo, useCallback, useMemo } from "react";
import PostTags from "./PostTags";

interface PostCardProps {
    post: Post;
    viewMode: 'grid' | 'list';
    onToggleLike: (id: number) => void;
    onUpdateStatus: (id: number, status: PostStatus) => void;
    onOpenExternal?: (id: number) => void;
}

const PostCard = memo<PostCardProps>(({ 
  post, 
  viewMode, 
  onToggleLike, 
  onUpdateStatus,
  onOpenExternal
}) => {
  const handleLikeToggle = useCallback(() => {
    onToggleLike(post.id);
  }, [onToggleLike, post.id]);

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateStatus(post.id, e.target.value as Post['status']);
  }, [onUpdateStatus, post.id]);

  const handleOpenExternal = useCallback(() => {
    onOpenExternal?.(post.id);
  }, [onOpenExternal, post.id]);

  const statusConfig = useMemo(() => getStatusColor(post.status), [post.status]);
  const priorityAccent = useMemo(() => getPriorityColor(post.priority), [post.priority]);

  const isGridView = viewMode === 'grid';

  return (
    <article
      className={`
        group bg-white border transition-all duration-200 hover:shadow-md
        ${isGridView 
          ? `rounded-lg border-l-4 ${priorityAccent} p-5 hover:-translate-y-0.5` 
          : `border-b border-gray-100 py-4 hover:bg-gray-50/50`
        }
      `}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-lg flex-shrink-0">{post.favicon}</span>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-relaxed">
              {post.title}
            </h3>
          </div>
          
          {/* Like button - only in grid view */}
          {isGridView && (
            <button
              onClick={handleLikeToggle}
              className={`
                p-1.5 rounded-full transition-all flex-shrink-0
                ${post.liked 
                  ? 'text-red-500 hover:bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }
              `}
            >
              <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Description - only in grid view */}
        {isGridView && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        )}

        {/* Tags */}
        <PostTags tags={post.tags} />

        {/* Meta + Controls */}
        <div className="flex items-center justify-between text-sm">
          {/* Left side - Meta info */}
          <div className="flex items-center gap-3 text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <time className="text-xs">{post.addedDate}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{post.readingTime}m</span>
            </span>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-2">
            {/* Status badge */}
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig}`}>
              {post.status}
            </span>

            {/* External link */}
            <button
              onClick={handleOpenExternal}
              className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
              title="Open link"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Like button for list view */}
            {!isGridView && (
              <button
                onClick={handleLikeToggle}
                className={`
                  p-1.5 rounded transition-colors
                  ${post.liked 
                    ? 'text-red-500 hover:bg-red-50' 
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }
                `}
              >
                <Heart className={`w-3.5 h-3.5 ${post.liked ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Status selector - only visible on hover in grid, always visible in list */}
        <div className={`
          ${isGridView ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'} 
          transition-opacity duration-200
        `}>
          <select
            value={post.status}
            onChange={handleStatusChange}
            className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="to-read">📚 To Read</option>
            <option value="reading">📖 Reading</option>
            <option value="read">✅ Read</option>
          </select>
        </div>
      </div>
    </article>
  );
});

export default PostCard;
