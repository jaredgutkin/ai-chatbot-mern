import axiosClient from "./Axios.js";

export const chatCompletion = async ({ prompt }) => {
    try {
        const reponse = await axiosClient.post("chats", { prompt });

        return { response};
    } catch (err) {
        return {err};
    }
};