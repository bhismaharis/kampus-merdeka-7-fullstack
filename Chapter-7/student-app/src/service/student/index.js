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

    // get data
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }

    return result?.data;
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
    if (!result?.success) {
        throw new Error(result?.message);
    }

    return result?.data;
};

export const createStudent = async (request) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", request.name);
    formData.append("nick_name", request.nickName);
    formData.append("class_id", request.classId);
    formData.append("university_id", request.universityId);
    if (request.profilePicture) {
        formData.append("profile_picture", request.profilePicture);
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/students`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
    });

    // get the data if fetching succeed!
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }

    return result?.data;
};

export const updateStudent = async (id, request) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", request.name);
    formData.append("nick_name", request.nickName);
    formData.append("class_id", request.classId);
    formData.append("university_id", request.universityId);
    if (request.profilePicture) {
        formData.append("profile_picture", request.profilePicture);
    }

    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/students/${id}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
            method: "PUT",
            body: formData,
        }
    );

    // get the data if fetching succeed!
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }

    return result?.data;
};

export const deleteStudent = async (id) => {
    const token = localStorage.getItem("token");

    let url = `${import.meta.env.VITE_API_URL}/students/${id}`;

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "DELETE",
    });

    // get data
    const result = await response.json();
    if (!result?.success) {
        throw new Error(result?.message);
    }

    return result?.data;
};