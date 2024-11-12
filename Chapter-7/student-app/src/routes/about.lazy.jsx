import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
    component: About,
});

function About() {
    return (
        <>
            <h1>Hello aku about</h1>
        </>
    );
}
