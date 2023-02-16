function getDomain() {
    return "localhost"
    // const url = window.location.hostname;
    // let hostname = url.split(".").slice(-2);
    // return hostname.length === 1 ? "localhost" : `.${hostname.join(".")}`;
}

const cookieOptions = {
    httpOnly: true,
    path: "/",
    maxAge: 365 * 24 * 60 * 60,
    domain: getDomain(),
    sameSite: "strict",
    SameSite: "Lax",
    secure: getDomain() !== "localhost"
}

const URLS = {
    API: process.env.REACT_APP_API,
}


const getAccessToken = function getAccessToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        return null
    }
    return `${token}`
}

const API_CONFIG = {
    headers: {
        "Cookie": getAccessToken(),
    }
}

const getUserAge = function getUserAge() {
    return localStorage.getItem("age");
}

const getToken = function getToken() {
    return localStorage.getItem("token");
}

const getId = function getId() {
    return localStorage.getItem("id") || null;
}


const getAuthorization = {
    headers: {
        AppCookie: getToken(),
    }
}
const logout = function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("age");
    window.location.reload()
}


export {
    URLS,
    getAccessToken,
    getId,
    getUserAge,
    getToken,
    logout,
    cookieOptions,
    API_CONFIG,
    getAuthorization
}