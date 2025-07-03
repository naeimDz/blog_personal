// src/utils/fetchNotionPosts.ts
//--------------------------------------------------------------

import { Post } from "../types/posts";
import { mapNotionPageToPost } from "../utils/mapNotionPageToPost";

// ⚠️ WARNING: This direct fetch is for local testing only!
// NEVER expose your Notion token in production
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DB_ID;
const NOTION_VERSION = "2022-06-28";                      

if (!NOTION_TOKEN || !DATABASE_ID) {
  throw new Error("❌ Missing NOTION env vars. Check .env.local");
}

/**
 * خيارات الاستعلام (كلّها اختياريّة)
 */
export interface FetchOptions {
  filter?: object;        // فلترة Notion الخام (نمرّرها كما هي)
  sorts?: object[];       // ترتيب
  pageSize?: number;      // افتراضي 100
  startCursor?: string;   // للـ pagination
}

/**
 * جلب جميع الـ posts كـ Post[]
 */
export async function fetchNotionPosts(
  options: FetchOptions = {}
): Promise<Post[]> {
  const {
    filter     = undefined,
    sorts      = undefined,
    pageSize   = 100,
    startCursor
  } = options;

  const body: Record<string, unknown> = {
    page_size: pageSize,
    ...(filter ? { filter } : {}),
    ...(sorts  ? { sorts  } : {}),
    ...(startCursor ? { start_cursor: startCursor } : {})
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Content-Type":  "application/json",
        "Notion-Version": NOTION_VERSION
      },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Notion API error (${res.status}): ${msg}`);
  }

  const json = await res.json();
  const pages = json.results as any[];

  // تحويل النتائج إلى Post[]
  return pages.map(mapNotionPageToPost);
}
