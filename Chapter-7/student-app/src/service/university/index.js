export const getUniversities = async () => {
    const token = localStorage.getItem("token");
    let url = `${import.meta.env.VITE_API_URL}/universities`;

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
