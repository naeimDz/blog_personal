import{ useState } from 'react';
import { Search, Plus, Grid, List, BookOpen, Code, } from 'lucide-react';
import { Post, PostStatus } from "./types/posts";
import { dummyPosts } from './data/dummyPosts';
import Footer from './components/Footer';
import { categories, statuses} from './utils/constants';
import QuickStats from './components/QuickStats';
import PostCard from './components/PostCard';
import AddPostForm from './components/AddPostForm';
const PostsShowcase = () => {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);


  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);


  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });


  const handleAddPost = (newPost: Omit<Post, 'id'>) => {
      const post: Post = {
        ...newPost,
        id: posts.length + 1,
      };
      setPosts([post, ...posts]);
     // setNewPost({ title: '', url: '', description: '', category: 'Technology', tags: [], priority: 'medium' });
      setShowAddForm(false);
    
  };

  const toggleLike = (id:number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, liked: !post.liked } : post
    ));
  };

  const updateStatus = (id:number, status:PostStatus) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status, lastRead: status === 'read' ? new Date().toISOString().split('T')[0] : post.lastRead } : post
    ));
  };




  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header with Tabs */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Code className="w-8 h-8 text-blue-600" />
                Posts Management System
              </h1>
              <p className="text-gray-600">Professional React Application Showcase</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Live Demo</span>
                </div>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Add Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Overview Tab - Live Demo */}
        <div>
          <QuickStats posts={posts}/>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Status' : status === 'to-read' ? 'To Read' : status}
                    </option>
                  ))}
                </select>

                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} onToggleLike={toggleLike}  onUpdateStatus ={updateStatus} />
            ))}
          </div>
        </div>


        {/* Add Post Modal */}
        {showAddForm && (
          <AddPostForm 
            onAddPost={handleAddPost} 
            onClose={() => setShowAddForm(false)} />
        )}

        {/* Empty State */}
        { filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filters, or add your first post!</p>
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PostsShowcase;