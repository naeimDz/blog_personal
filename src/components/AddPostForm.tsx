// components/AddPostForm.tsx

import React, { useState } from 'react';
import { Post, PostStatus, Priority } from '../types/posts';
import { X } from 'lucide-react';
import { categories } from '../utils/constants';


interface AddPostFormProps {
    onAddPost: (post: Omit<Post, 'id'>) => void;
    onClose: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost,onClose }) => {
  const [newPost, setNewPost] = useState<{
    title: string;
    url: string;
    description: string;
    category: string;
    tags: string[];
    priority: string;
  }>({
    title: '',
    url: '',
    description: '',
    category: 'Technology',
    tags: [],
    priority: 'medium'
  });

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim()) return;

    onAddPost({
        title:newPost.title,
        description:newPost.description,
        status: 'to-read' as PostStatus,
        url: newPost.url  ||  '',
        category: newPost.category,
        tags: newPost.tags,
        readingTime: Math.floor(Math.random() * 20) + 5,
        addedDate: new Date().toISOString().split('T')[0],
        liked: false,
        thumbnail: `https://placehold.co/600x400/6366F1/ffffff?text=${encodeURIComponent(newPost.title.slice(0, 10))}`,
        favicon: '🔖',
        priority: newPost.priority as Priority,
        notes: '',
    });

    // Reset form
    setNewPost
({
      title: '',
      url: '',
      description: '',
      category: 'Technology',
      tags: [],
      priority: 'medium'
    });
    
  };



  return (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Post</h2>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter post title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input
                    type="url"
                    value={newPost.url}
                    onChange={(e) => setNewPost({...newPost, url: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newPost.description}
                    onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Brief description of the content..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newPost.priority}
                      onChange={(e) => setNewPost({...newPost, priority: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="React, Performance, Patterns"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                   onClick={onClose}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPost}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-medium"
                >
                  Add Post
                </button>
              </div>
            </div>
          </div>
  );
};

export default AddPostForm;
