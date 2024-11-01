import { Link, useNavigate } from "@tanstack/react-router";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        const getProfile = async (token) => {
            // fetch get profile
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
                // set the user state here
                dispatch(setUser(result.data));
                return;
            }

            // If not success
            // delete the local storage here
            dispatch(setUser(null));
            dispatch(setToken(null));

            // redirect to login
            navigate({ to: "/login" });
        };

        if (token) {
            // hit api auth get profile and pass the token to the function
            getProfile(token);
        }
    }, [dispatch, navigate, token]);

    const logout = (event) => {
        event.preventDefault();

        // delete the local storage here
        dispatch(setUser(null));
        dispatch(setToken(null));

        // redirect to login
        navigate({ to: "/login" });
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
