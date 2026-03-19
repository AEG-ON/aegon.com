import type { Route } from "./+types/devtools";

export function loader({ request }: Route.LoaderArgs) {
  return new Response(null, { status: 404 });
}