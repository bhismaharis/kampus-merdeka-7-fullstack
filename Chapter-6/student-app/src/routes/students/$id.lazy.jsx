import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getDetailStudent } from "../../service/student";

export const Route = createLazyFileRoute("/students/$id")({
    component: StudentDetail,
});

function StudentDetail() {
    const { id } = Route.useParams();

    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    useEffect(() => {
        const getDetailStudentData = async (id) => {
            setIsLoading(true);
            const result = await getDetailStudent(id);
            if (result?.success) {
                setStudent(result.data);
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
            }
            setIsLoading(false);
        };

        if (id) {
            getDetailStudentData(id);
        }
    }, [id]);

    if (isLoading) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Loading...</h1>
                </Col>
            </Row>
        );
    }

    if (isNotFound) {
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center">Student is not found!</h1>
                </Col>
            </Row>
        );
    }

    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Img variant="top" src={student?.profile_picture} />
                    <Card.Body>
                        <Card.Title>{student?.name}</Card.Title>
                        <Card.Text>{student?.nick_name}</Card.Text>
                        <Card.Text>{student?.classes?.class}</Card.Text>
                        <Card.Text>{student?.universities?.name}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={3}></Col>
        </Row>
    );
}
