export const getStudents = async (nickname, name) => {
    const token = localStorage.getItem("token");
    let params;
    if (nickname) {params.append("nickname", nickname);}
    if (name) {params.append("name", name);}

    let url = `${import.meta.env.VITE_API_URL}/students` + new URLSearchParams(params);

    const response = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`,
        },
        method: "GET",
    });    

    // get the data if fetching succeed!
    const result = await response.json();
    return result;
}