
export function getError(error) {
    if (!error) {
        return "Somthing went wrong"
    } else if (typeof error === "string") {
        return error
    } else {
        return error.response?.data?.error || error.response?.data?.message || error.response?.message || error.message || `${error}`
    }
}