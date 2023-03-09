import axios from "axios"
import { getAuthorization, getId, URLS } from "../constants/constent"
import { getError } from "../constants/helper"


export function getProfileAction(callback, token) {
    axios.get(`${URLS.API}auth/profile`, {
        headers: {
            AppCookie: token,
        }
    }).then(function (response) {
        callback({ data: response.data })
    })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function getDispensariesAction(callback) {
    axios.get(`${URLS.API}dispensaries`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data.results })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function getDispensaryDetailsAction(callback, id) {
    axios.get(`${URLS.API}dispensaries/${id}`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}
export function getProductsAction(callback, id) {
    let url = `${URLS.API}products`
    if (id) {
        url = `${URLS.API}products?dispensary=${id}`
    }
    axios.get(url, getAuthorization)
        .then(function (response) {
            callback({ data: response.data.results })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function getProductDetailsAction(callback, id) {
    axios.get(`${URLS.API}products/${id}`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function getOrdersAction(callback) {
    axios.get(`${URLS.API}orders?user=${getId()}`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function getActivePickupsAction(callback) {
    axios.get(`${URLS.API}pickups/active`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}

export function getNewPickupsAction(callback) {
    axios.get(`${URLS.API}pickups/new`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}


export function getPrevPickupsAction(callback) {
    axios.get(`${URLS.API}pickups/past`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}



export function getCartAction(callback) {
    axios.get(`${URLS.API}cart`, getAuthorization).then(function (response) {
        callback({ data: response.data })
    })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}