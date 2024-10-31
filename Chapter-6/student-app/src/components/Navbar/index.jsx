import { Link } from "@tanstack/react-router";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { useEffect, useState } from "react";

const NavigationBar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // get the token from local storage
        const token = localStorage.getItem("token");

        // hit api auth get profile and pass the token  to the function
        getProfile(token);
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

        // if not success
        // delete the local storage token
        localStorage.removeItem("token");

        // redirect to login
        window.location.href = "/login";
    };

    const logout = (event) => {
        event.preventDefault();

        // remove the token from local storage
        localStorage.removeItem("token");

        // redirect to login
        window.location.href = "/login";
    };

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Student Wakanda App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/profile">
                                    <Image
                                        src={user?.profile_picture}
                                        fluid
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            display: "inline-block",
                                            overflow: "hidden",
                                            borderRadius: "50%",
                                        }}
                                    />{" "}
                                    {user?.name}
                                </Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
