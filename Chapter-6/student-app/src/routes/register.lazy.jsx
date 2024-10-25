import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export const Route = createLazyFileRoute("/register")({
    component: Register,
});

function Register() {
    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card className="text-center">
                    <Card.Header>Register</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextName"
                            >
                                <Form.Label column sm="3">
                                    Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextEmail"
                            >
                                <Form.Label column sm="3">
                                    Email
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                </Col>
                            </Form.Group>

                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextPassword"
                            >
                                <Form.Label column sm="3">
                                    Password
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextConfirmPassword"
                            >
                                <Form.Label column sm="3">
                                    Confirm Password
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextConfirmPassword"
                            >
                                <Form.Label column sm="3">
                                    Profile Picture
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="file"
                                        placeholder="Profile Picture"
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                        <div className="d-grid gap-2">
                            <Button variant="primary">Register</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}
