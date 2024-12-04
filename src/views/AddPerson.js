import { useState } from "react"
import { Link } from "react-router-dom"
import ApiService from "../services/ApiService"

const AddPerson = () => {
    const [dataForm, setDataForm] = useState({
        name: '',
        dob: '',
        address: '',
    })
    const [message, setMessage] = useState(null)

    const onSubmit = async () => {
        try{
            setMessage({
                type: 'success',
                message : "Berhasil Menambahkan Data"
            })
    
            const res = await ApiService.fetchData({
                method: 'POST',
                url: `/api/v1/persons`,
                data: dataForm
            })
            if(res.status !== 201) {
                setMessage({
                    type: 'err',
                    message : res?.data?.message
                })
            }
        }catch(err){
            setMessage({
                type: 'err',
                message : err?.response?.data?.message
            })
        }
    }

    return (
        <div className="w-2/5">
            {
                message?.type === 'err' && (
                    <div className="rounded p-2 bg-red-500 text-wrap">{message?.message}</div>
                )
            }
            {
                message?.type === "success" && (
                    <div className="rounded p-2 bg-green-500 text-wrap">{message?.message}</div>
                )
            }
            <div className="flex flex-col gap-3 mt-2">   
                <div>
                    <label htmlFor="name" className="mb-2 font-light">Nama</label>
                    <div>
                        <input
                            className="bg-transparent border border-gray-500 rounded min-w-full p-2"
                            type="text"
                            id="name"
                            name="name"
                            value={dataForm?.name}
                            onChange={(e) => { setDataForm({ ...dataForm, name: e.target.value }) }}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="mb-2 font-light">Tanggal Lahir</label>
                    <div>
                        <input
                            className="bg-transparent border border-gray-500 rounded min-w-full p-2"
                            type="date"
                            id="dob"
                            name="dob"
                            value={dataForm?.dob}
                            onChange={(e) => { setDataForm({ ...dataForm, dob: e.target.value }) }}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="mb-2 font-light">Tempat Tinggal</label>
                    <div>
                        <input
                            className="bg-transparent border border-gray-500 rounded min-w-full p-2"
                            type="text"
                            id="address"
                            name="address"
                            value={dataForm?.address}
                            onChange={(e) => { setDataForm({ ...dataForm, address: e.target.value }) }}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="text-white border bg-green-500 border-gray-500 rounded-lg px-2 py-1"
                    onClick={onSubmit}
                >
                    Tambah Person
                </button>
                <Link
                    to="/"
                    className="text-white border border-gray-500 rounded-lg px-2 py-1 text-center"
                >
                    Kembali
                </Link>
            </div>
        </div>
    )
}

export default AddPerson