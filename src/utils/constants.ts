// constants.ts

export const categories = [
  'all',
  'Technology',
  'Engineering',
  'Design',
  'Business',
  'Science',
];

export const statuses = ['all', 'to-read', 'reading', 'read'];

export const statusColors: Record<string, string> = {
  'read': 'bg-green-100 text-green-800 border-green-200',
  'reading': 'bg-blue-100 text-blue-800 border-blue-200',
  'to-read': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export const priorityColors: Record<string, string> = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-green-500',
};
