// src/utils/mapNotionPageToPost.ts

import { Post, PostStatus, Priority } from "../types/posts";

export function mapNotionPageToPost(page: any): Post {
  const props = page.properties;
  return {
    id: page.id,
    title: props.Title?.title?.[0]?.plain_text ?? "Untitled",
    url: props.URL?.url ?? "",
    description: props.Description?.rich_text?.[0]?.plain_text ?? "",
    category: props.Category?.select?.name ?? "Uncategorized",
    tags: props.Tags?.multi_select?.map((tag: any) => tag.name) ?? [],
    status: props.Status?.select?.name as PostStatus,
    readingTime: props.ReadingTime?.number ?? 0,
    addedDate: page.created_time,
    lastRead: props.LastRead?.date?.start ?? undefined,
    liked: props.Liked?.checkbox ?? false,
    priority: props.Priority?.select?.name as Priority,
    notes: props.Notes?.rich_text?.[0]?.plain_text ?? "",
    favicon: props.Favicon?.url ?? "",
    thumbnail: props.Thumbnail?.url ?? ""
  };
}
