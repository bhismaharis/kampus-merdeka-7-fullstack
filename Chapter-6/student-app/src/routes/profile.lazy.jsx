import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/profile")({
    component: Profile,
});

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // get the token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        } else {
            // hit api auth get profile and pass the token  to the function
            getProfile(token);
        }
    }, []);

    const getProfile = async (token) => {
        // fetch get profile api
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/profile`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                method: "GET",
            }
        );

        // get data
        const result = await response.json();
        if (result.success) {
            // set the profile data
            setUser(result.data);
            return;
        }

        alert(result.message);
    };

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Img variant="top" src={user?.profile_picture} />
                    <Card.Body>
                        <Card.Title>{user?.name}</Card.Title>
                        <Card.Text>{user?.email}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}
