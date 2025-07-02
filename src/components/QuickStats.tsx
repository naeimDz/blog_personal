// components/QuickStats.tsx

import React from 'react';
import { Post } from '../types/posts';
import { BookOpen, CheckCircle, Clock, Heart } from 'lucide-react';

interface QuickStatsProps {
  posts: Post[];
}

const QuickStats: React.FC<QuickStatsProps> = ({ posts }) => {
  const total = posts.length;
  const read = posts.filter((p) => p.status === 'read').length;
  const reading = posts.filter((p) => p.status === 'reading').length;
  const toRead = posts.filter((p) => p.status === 'to-read').length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Total Posts</p>
            <p className="text-2xl font-bold">{posts.length}</p>
          </div>
          <BookOpen className="w-8 h-8 text-blue-200" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Read</p>
            <p className="text-2xl font-bold">{posts.filter(p => p.status === 'read').length}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-200" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm">To Read</p>
            <p className="text-2xl font-bold">{posts.filter(p => p.status === 'to-read').length}</p>
          </div>
          <Clock className="w-8 h-8 text-yellow-200" />
        </div>
      </div>
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100 text-sm">Liked</p>
            <p className="text-2xl font-bold">{posts.filter(p => p.liked).length}</p>
          </div>
          <Heart className="w-8 h-8 text-red-200" />
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
