import ky from "ky"

const {
    VITE_ECHO_API_BASE_URL: baseUrl,
} = import.meta.env;

const client = ky.create({
    prefixUrl: baseUrl,
});

export const clientBaseUrl = baseUrl;
export const useClient = () => client;
