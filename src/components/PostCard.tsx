import { Heart, Calendar, Clock, Share2, ExternalLink, Archive } from "lucide-react";
import { Post, PostStatus } from "../types/posts";
import { getPriorityColor, getStatusColor } from "../utils/helpers";

interface PostCardProps {
    post: Post;
    onToggleLike: (id: number) => void;
    onUpdateStatus: (id: number, status: PostStatus) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onToggleLike,onUpdateStatus }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${getPriorityColor(post.priority)} group hover:scale-[1.02]`}>
      <div className="relative">
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onToggleLike(post.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              post.liked 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
          </button>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-white/90 ${getStatusColor(post.status)}`}>
            {post.status === 'to-read' ? 'To Read' : post.status === 'reading' ? 'Reading' : 'Read'}
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-2xl">{post.favicon}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post.addedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime}min
          </span>
        </div>

        {post.notes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800">{post.notes}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <select 
              value={post.status}
              onChange={(e) => onUpdateStatus(post.id, e.target.value as PostStatus)}
              className="text-xs border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="to-read">To Read</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Archive className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
