import { createLazyFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUniversities } from "../../../service/university";
import { getClasses } from "../../../service/class";
import { getDetailStudent, updateStudent } from "../../../service/student";
import { toast } from "react-toastify";
import Protected from "../../../components/Auth/Protected";

export const Route = createLazyFileRoute("/students/edit/$id")({
    component: () => (
        <Protected roles={[1]}>
            <EditStudent />
        </Protected>
    ),
});

function EditStudent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [profilePicture, setProfilePicture] = useState(undefined);
    const [universityId, setUniversityId] = useState(0);
    const [classId, setClassId] = useState(0);
    const [isNotFound, setIsNotFound] = useState(false);

    const { data: universities, isLoading: isLoadingUniversities } = useQuery({
        queryKey: ["universities"],
        queryFn: getUniversities,
    });

    const { data: classes, isLoading: isLoadingClasses } = useQuery({
        queryKey: ["classes"],
        queryFn: getClasses,
    });

    const { data: student, isLoading: isLoadingStudent } = useQuery({
        queryKey: ["student", id],
        queryFn: () => getDetailStudent(id),
        onSuccess: (data) => {
            if (data?.success) {
                setName(data.data?.name);
                setNickName(data.data?.nick_name);
                setUniversityId(data.data?.university_id);
                setClassId(data.data?.class_id);
                setProfilePicture(data.data?.profile_picture);
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
            }
        },
        onError: () => {
            setIsNotFound(true);
        },
    });

    const mutation = useMutation({
        mutationFn: updateStudent,
        onSuccess: () => {
            queryClient.invalidateQueries(["students"]);
            toast.success("Student updated successfully!");
            navigate("/");
        },
        onError: (err) => {
            toast.error(err?.message);
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();

        const request = {
            name,
            nickName,
            classId,
            universityId,
            profilePicture,
        };

        mutation.mutate({ id, ...request });
    };

    useEffect(() => {
        if (isNotFound) {
            navigate("/");
        }
    }, [isNotFound, navigate]);

    if (isLoadingUniversities || isLoadingClasses || isLoadingStudent) {
        return (
            <Row className="mt-4">
                <h1>Loading...</h1>
            </Row>
        );
    }

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Header className="text-center">
                        Edit Student
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group as={Row} className="mb-3" controlId="name">
                                <Form.Label column sm={3}>
                                    Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="nick_name">
                                <Form.Label column sm={3}>
                                    Nick Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nick Name"
                                        required
                                        value={nickName}
                                        onChange={(event) => setNickName(event.target.value)}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="university">
                                <Form.Label column sm={3}>
                                    University
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={universityId}
                                        onChange={(event) => setUniversityId(event.target.value)}
                                    >
                                        <option disabled selected>
                                            Select University
                                        </option>
                                        {universities?.data?.map((university) => (
                                            <option key={university.id} value={university.id}>
                                                {university.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="class">
                                <Form.Label column sm={3}>
                                    Class
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={classId}
                                        onChange={(event) => setClassId(event.target.value)}
                                    >
                                        <option disabled selected>
                                            Select Class
                                        </option>
                                        {classes?.data?.map((classItem) => (
                                            <option key={classItem.id} value={classItem.id}>
                                                {classItem.class}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="profilePicture">
                                <Form.Label column sm={3}>
                                    Profile Picture
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="file"
                                        placeholder="Choose File"
                                        onChange={(event) => setProfilePicture(event.target.files[0])}
                                        accept=".jpg,.png"
                                    />
                                </Col>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary">
                                    Update Student
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

export default EditStudent;
