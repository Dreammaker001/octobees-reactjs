export const checkResponseFetch = (navigate, resp, onSuccess = () => { }, onError = () => {}) => {
    if (resp?.status === 'success' || resp?.status === 200 || resp?.status === 201) {
        onSuccess();
    } else {
        if (resp?.status === 401 || resp?.message === "Unauthenticated.") {
            navigate("/login")
            return
        }
        onError();
    }
};