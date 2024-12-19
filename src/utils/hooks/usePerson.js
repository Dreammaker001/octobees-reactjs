import { apiGetPersons } from "../../services/PersonService";

function usePerson() {
    const getPerson = async (data) => {
        try {
            const resp = await apiGetPersons(data)
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
        getPerson
    }
}

export default usePerson;