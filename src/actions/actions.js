import axios from "axios"
import { getAuthorization, URLS } from "../constants/constent"
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

export function getProductsAction(callback) {
    axios.get(`${URLS.API}products`, getAuthorization)
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

export function getPrevPickupsAction(callback) {
    axios.get(`${URLS.API}pickups`, getAuthorization)
        .then(function (response) {
            callback({ data: response.data })
        })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}



export function getCartAction(callback, token) {
    axios.get(`${URLS.API}cart`, {
        headers: {
            AppCookie: token,
        }
    }).then(function (response) {
        console.log("products", response)
        callback({ data: response.data.products })
    })
        .catch(function (error) {
            callback({ error: getError(error) })
        })
}