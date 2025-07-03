import{ lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Search, Plus, Grid, List, BookOpen, Code, Star, Image, Clock, Calendar} from 'lucide-react';
import { Post, PostStatus } from "./types/posts";
import { dummyPosts } from './data/dummyPosts';
import { categories, statuses} from './utils/constants';
import PostCard from './components/PostCard';
import AddPostForm from './components/AddPostForm';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import DownloadPostsButton from './components/DownloadPostsButton';
import QuickStatsSkeleton from './components/QuickStatsSkeleton';


const QuickStats = lazy(() => import('./components/QuickStats'));
const Footer = lazy(() => import('./components/Footer'));


const Posts = () => {
  const { user,logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const featuredPost = posts[0];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


useEffect(() => {
  setLoading(true);
  fetch('/api/posts')
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch");
      console.log("Fetched posts from API",res);
      return res.json();
    })
    .then(data => {
      setPosts(data); 
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => setLoading(false));
}, []);



  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

const filteredPosts = useMemo(() => {
  return posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });
}, [posts, searchTerm, selectedCategory, selectedStatus]);


  const handleAddPost = (newPost: Omit<Post, 'id'>) => {
      const post: Post = {
        ...newPost,
        id: posts.length + 1,
      };
      setPosts(prev => [post, ...prev]);
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


  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}

      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Code className="w-8 h-8 text-blue-600" />
                  Posts Management System
                </h1>
                <p className="text-gray-600">Professional React Application Showcase</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Welcome, {user.email}</span>
              </div>
              <button
                onClick={()=>logout()}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Add Post
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">

        <Suspense fallback={<QuickStatsSkeleton />}>
              <QuickStats posts={posts} />
        </Suspense>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px]"
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
                className="px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[120px]"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status === 'to-read' ? 'To Read' : status}
                  </option>
                ))}
              </select>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <DownloadPostsButton posts={filteredPosts} />
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {featuredPost.thumbnail ? (
                  <img
                    src={featuredPost.thumbnail}
                    alt={featuredPost.title}
                    className="object-cover w-full h-64 md:h-full"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center h-64 md:h-full text-gray-400">
                    <Image className="w-12 h-12" />
                  </div>
                )}

                <div className="md:col-span-2 p-8 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-yellow-500 w-5 h-5" />
                      <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Featured Post</span>
                    </div>
                    <a
                      href={featuredPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors block mb-3"
                    >
                      {featuredPost.title}
                    </a>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">{featuredPost.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 flex-wrap gap-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readingTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.addedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid/List */}
        <div className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  viewMode="grid"
                  onToggleLike={toggleLike}
                  onUpdateStatus={updateStatus}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  viewMode="list"
                  onToggleLike={toggleLike}
                  onUpdateStatus={updateStatus}
                />
              ))}
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="text-center py-6">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredPosts.length}</span> of <span className="font-semibold text-gray-900">{posts.length}</span> posts
          </p>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No posts found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters, or add your first post!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Add Your First Post
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Suspense fallback={<div>Loading stats...</div>}>
        <Footer />     
      </Suspense>


      {/* Add Post Modal */}
        {showAddForm && (
          user ?  
          <AddPostForm 
            onAddPost={handleAddPost} 
            onClose={() => setShowAddForm(false)} />
          : <LoginForm />
        )}
    </div>
  );
};

export default Posts;