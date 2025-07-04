// helpers.ts

import { PostStatus, Priority } from '../types/posts';
import { statusColors, priorityColors } from './constants';

export const getStatusColor = (status: PostStatus): string => {
  return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPriorityColor = (priority: Priority): string => {
  return priorityColors[priority] || 'border-l-gray-300';
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toISOString().split('T')[0];
};

export const generateThumbnail = (title: string): string => {
  return `https://placehold.co/600x400/6366F1/ffffff?text=${encodeURIComponent(title.slice(0, 10))}`;
};
