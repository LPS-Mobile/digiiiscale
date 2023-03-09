
export function getError(error) {
    if (!error) {
        return "Somthing went wrong"
    } else if (typeof error === "string") {
        return error
    } else {
        return error.response?.data?.error || error.response?.data?.message || error.response?.message || error.message || `${error}`
    }
}



export const range = (to) =>
    [...Array(Math.floor((to - 0)))].map((_, i) => 0 + i);

export const sumArray = (array) => {
    const ourArray = array;
    let sum = 0;
    for (let i = 0; i < ourArray?.length; i += 1) {
        sum += ourArray[i];
    }

    return sum;
}


export function convertDate(dateRange) {
    if (!dateRange)
        return ""
    return dateRange.split(" - ")
        .map(date => new Intl.DateTimeFormat('en-In').format(new Date(date)))
        .join(" - ")
}