export const getStudents = async (nickname, name) => {
    const token = localStorage.getItem("token");
    let params;
    if (nickname) {
        params.append("nickname", nickname);
    }
    if (name) {
        params.append("name", name);
    }

    let url =
        `${import.meta.env.VITE_API_URL}/students` +
        new URLSearchParams(params);

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "GET",
    });

    // get the data if fetching succeed!
    const result = await response.json();
    return result;
};

export const getDetailStudent = async (id) => {
    const token = localStorage.getItem("token");

    let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "GET",
    });

    // get data
    const result = await response.json();
    return result;
};

export const createStudent = async (student) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/students`,
        {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(student),
        }
    );

    // get data
    const result = await response.json();
    return result;
};

export const updateStudent = async (id, student) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/students/${id}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(student),
        }
    );

    // get data
    const result = await response.json();
    return result;
};
