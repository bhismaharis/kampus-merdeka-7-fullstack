import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login, loginWithGoogle } from "../service/auth";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";

export const Route = createLazyFileRoute("/login")({
    component: Login,
});

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (token) {
        navigate({ to: "/" });
    }

    // Mutation is used for POST, PUT, PATCH and DELETE
    const { mutate: loginUser } = useMutation({
        mutationFn: (body) => {
            return login(body);
        },
        onSuccess: (data) => {
            // set token to global state
            dispatch(setToken(data?.token));
            localStorage.setItem("token", data?.token);

            // redirect to home
            navigate({ to: "/" });
        },
        onError: (err) => {
            toast.error(err?.message);
        },
    });

    const { mutate: loginWithGoogleMutation } = useMutation({
        mutationFn: (accessToken) => {
            return loginWithGoogle(accessToken);
        },
        onSuccess: (data) => {
            // set token to global state
            dispatch(setToken(data?.token));
            console.log(data);

            // redirect to home
            navigate({ to: "/" });
        },
        onError: (err) => {
            toast.error(err?.message);
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        /* hit the login API */
        // define the request body
        const body = {
            email,
            password,
        };

        // hit the login API with the data
        loginUser(body);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            loginWithGoogleMutation(tokenResponse.access_token);
        },
        onError: (err) => console.log(err),
    });

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Header className="text-center">Login</Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="email"
                            >
                                <Form.Label column sm={3}>
                                    Email
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="password"
                            >
                                <Form.Label column sm={3}>
                                    Password
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="d-grid gap-2 mb-2">
                                <Button type="submit" variant="primary">
                                    Login
                                </Button>
                            </div>
                            <div className="d-grid gap-2">
                                <Button onClick={googleLogin} variant="primary">
                                    Login with Google
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
