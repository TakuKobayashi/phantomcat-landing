export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

export interface NewsListResponse {
  items: Omit<NewsItem, "content">[];
  total: number;
}
