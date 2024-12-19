import ApiService from "./ApiService";

export async function apiGetPersons(params) {
    return ApiService.fetchData({
        method: 'GET',
        url: '/api/v1/persons',
        params: params
    })
}