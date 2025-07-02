// src/types/post.ts
export type PostStatus = "to-read" | "reading" | "read";
export type Priority = "low" | "medium" | "high";

export interface Post {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  status: PostStatus;
  readingTime: number;
  addedDate: string;
  lastRead?: string;
  liked: boolean;
  priority: Priority;
  notes?: string;
  favicon?: string;
  thumbnail?: string;
}
