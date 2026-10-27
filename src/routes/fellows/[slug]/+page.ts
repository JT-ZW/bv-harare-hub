import { error } from "@sveltejs/kit";
import { fellows } from "$lib/data/fellows";
export const entries = () => fellows.map((f) => ({ slug: f.slug }));
export const load = ({ params }: { params: { slug: string } }) => {
  const fellow = fellows.find((f) => f.slug === params.slug);
  if (!fellow) error(404, "Fellow not found");
  return { fellow };
};
