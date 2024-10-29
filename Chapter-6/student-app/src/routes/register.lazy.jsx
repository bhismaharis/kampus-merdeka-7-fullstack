import { createLazyFileRoute } from "@tanstack/react-router";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

export const Route = createLazyFileRoute("/register")({
    component: Register,
});

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(undefined);
    const onSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            alert("Password and password confirmation must be same!");
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile_picture", profilePicture);
        const response = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            body: formData,
        });
        // get the data if fetching succeed!
        const result = await response.json();
        if (result.success) {
            // save token to local storage
            localStorage.setItem("token", result.data.token);
            return;
        }
        alert(result.message);
    };

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card className="text-center">
                    <Card.Header>Register</Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
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
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
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
                                <Form.Label column sm="3">
                                    Password
                                </Form.Label>
                                <Col sm="9">
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
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                        }}
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
                                        placeholder="Choose File"
                                        required
                                        onChange={(e) => {
                                            setProfilePicture(
                                                e.target.files[0]
                                            );
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary">
                                    Register
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
