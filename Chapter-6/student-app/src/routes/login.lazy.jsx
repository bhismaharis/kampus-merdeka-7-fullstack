import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

export const Route = createLazyFileRoute("/login")({
    component: Login,
});

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        /* hit the login API */
        // define the request body
        const body = {
            email,
            password,
        };

        // hit the login API with the data
        const response = await fetch("http://localhost:3000/auth/login", {
            body: JSON.stringify(body),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // get the data if fetcing id successful
        const result = await response.json();
        if (result.success) {
            // save the token in local storage
            localStorage.setItem("token", result.data.token);
            return;
        }
        alert(result.message);
    };

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card className="text-center">
                    <Card.Header>Login</Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextEmail"
                            >
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextPassword"
                            >
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}
