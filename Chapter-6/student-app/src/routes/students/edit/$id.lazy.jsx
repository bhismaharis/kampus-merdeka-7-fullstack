import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/students/edit/$id")({
    component: () => <div>Hello /students/edit/$id!</div>,
});
