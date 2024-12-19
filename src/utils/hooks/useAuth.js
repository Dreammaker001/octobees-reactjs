import { apiLogin, apiRegister } from "../../services/AuthService"
import { setToken } from "../token";

function useAuth() {
    const login = async (data) => {
        try {
            const resp = await apiLogin(data)
            if (resp.data) {
                setToken(resp.data.token)
        
                return {
                    status: "success",
                    message: "",
                    data: resp?.data,
                };
            }
        } catch (errors) {
            return {
                status: "failed",
                message: errors?.response?.data?.message || errors.toString(),
            };
        }
    }

    const register = async (data) => {
        try {
            const resp = await apiRegister(data)
            if (resp.data) {
                return {
                    status: "success",
                    message: "",
                    data: resp?.data,
                };
            }
        } catch (errors) {
            return {
                status: "failed",
                message: errors?.response?.data?.message || errors.toString(),
            };
        }
    }

    return {
        login,
        register
    }
}

export default useAuth;