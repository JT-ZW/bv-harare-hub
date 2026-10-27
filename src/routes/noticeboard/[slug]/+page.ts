import { error } from "@sveltejs/kit";
import { activeNotices } from "$lib/data/notices";
export const entries = () => activeNotices().map((n) => ({ slug: n.slug }));
export const load = ({ params }: { params: { slug: string } }) => {
  const notice = activeNotices().find((n) => n.slug === params.slug);
  if (!notice) error(404, "Update not found");
  return { notice };
};
