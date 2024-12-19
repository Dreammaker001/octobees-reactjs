import ApiService from "./ApiService";

export async function apiLogin(data) {
    return ApiService.fetchData({
        method: 'POST',
        url: '/api/v1/auth/login',
        data
    })
}

export async function apiRegister(data) {
    return ApiService.fetchData({
        method: 'POST',
        url: '/api/v1/auth/register',
        data
    })
}