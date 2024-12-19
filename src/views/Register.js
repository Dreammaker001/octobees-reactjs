import { Formik } from "formik";
import * as Yup from 'yup';
import useAuth from "../utils/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { checkResponseFetch } from "../utils/response";
import { useState } from "react";

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min('6'),
});

const Register = () => {
    const navigate = useNavigate()

    // Hooks
    const {register} = useAuth();

    // State
    const [message, setMessage] = useState(null)
    
    const onSubmit = async (values) => {
        const res = await register(values)

        checkResponseFetch(navigate, res, () => {
            setMessage({
                type: 'success',
                message : "Successfully Created Account"
            })
        }, () => {
            setMessage({
                type: 'err',
                message : res?.message
            })
        })
    }

    return (
        <div className="flex justify-center items-center text-[14px] min-h-[100vh] overflow-x-auto">
            <div className="w-full max-w-[415px] min-w-[170px]">
                <div className="text-center text-[34px] font-bold mb-4">Register</div>
                {
                    message?.type === 'err' && (
                        <div className="mb-3 rounded p-2 bg-red-500 text-wrap">{message?.message}</div>
                    )
                }
                {
                    message?.type === "success" && (
                        <div className="mb-3 rounded p-2 bg-green-500 text-wrap">{message?.message}</div>
                    )
                }
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={ValidationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                            <div>
                                    <label className="font-bold">Name</label>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                            className="bg-transparent border border-gray-500 rounded min-w-full p-2"
                                        />
                                        {errors.name && touched.name ? <div className="text-red-400">{errors.name}</div> : null}
                                    </div>
                                </div>
                                <div>
                                    <label className="font-bold">Email</label>
                                    <div className="mt-3">
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="bg-transparent border border-gray-500 rounded min-w-full p-2"
                                        />
                                        {errors.email && touched.email ? <div className="text-red-400">{errors.email}</div> : null}
                                    </div>
                                </div>
                                <div>
                                    <label className="font-bold">Password</label>
                                    <div className="mt-3">
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="bg-transparent border border-gray-500 rounded min-w-full p-2"
                                        />
                                        {errors.email && touched.email ? <div className="text-red-400">{errors.password}</div> : null}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    // disabled={isSubmitting}
                                    className="text-white border bg-green-500 border-gray-500 rounded-lg font-bold py-3"
                                >
                                    Register
                                </button>
                                <button
                                    type="button"
                                    className="text-white border bg-transparent border-white rounded-lg font-bold py-3"
                                    onClick={() => {
                                        navigate('/login')
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Register;