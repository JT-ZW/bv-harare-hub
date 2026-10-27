export const noticeTypes = [
  "All updates",
  "Events",
  "Articles",
  "Opportunities",
  "Hub news",
  "Promotions",
  "Products",
  "Services",
] as const;
export type Notice = {
  slug: string;
  title: string;
  type: Exclude<(typeof noticeTypes)[number], "All updates">;
  excerpt: string;
  body: string;
  publishedAt: string;
  expiresAt?: string;
  fellowSlug?: string;
  image?: string;
  externalUrl?: string;
};
// Only approved, published chapter content belongs here. No invented events or offers.
export const notices: Notice[] = [];
export const activeNotices = (now = new Date()) =>
  notices.filter(
    (n) =>
      new Date(n.publishedAt) <= now &&
      (!n.expiresAt || new Date(n.expiresAt) > now),
  );
