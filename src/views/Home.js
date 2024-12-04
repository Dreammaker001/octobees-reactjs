import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { API_URL } from "../constants/api.constants";
import { debounce } from 'lodash';
import ApiService from "../services/ApiService";

const Home = () => {
    const [data, setData] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [message, setMessage] = useState(null)

    const fetchApi = async (page = 1, q= '') => {
        setMessage(null)
        try {
            const res = await ApiService.fetchData({
                method: 'GET',
                url: `/api/v1/persons?page=${page}&q=${q}`,
            })
            setData(res.data)
        } catch(err) {
            setMessage({
                type: 'err',
                message: err?.response?.data?.message
            })
        }
    }


    const onDelete = async (item) => {
        setMessage({
            type: 'success',
            message: "Berhasil Menghapus " + item?.name
        })

        const res = await axios.delete(`${API_URL}/api/v1/persons/${item?.id}`)
        if (res.status !== 200) {
            setMessage({
                type: 'err',
                message: res?.data?.message
            })
        }
        fetchApi(data?.meta?.current_page)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            setSearchParams({ q: searchValue });
        }, 500),
        []
    );

    const handleSearch = (val) => {
        debouncedSearch(val)
    }

    const handlePageChange = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    }
    useEffect(() => {
        const q = searchParams.get('q') || '';
        const page = searchParams.get('page') || 1;
        fetchApi(page, q)
    }, [searchParams])

    return (
        <div className="min-w-full min-h-full p-5">
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
            <div className="flex justify-between">
                <div>
                    <input 
                        type="text" 
                        className="bg-transparent border border-gray-500 rounded min-w-full p-2"
                        placeholder="Cari nama..." 
                        onChange={(e) => handleSearch(e.target.value)} 
                    />
                </div>
                <div className="flex justify-end mb-4 mt-3">
                    <Link className="text-white border border-gray-500 rounded-lg px-2 py-1" to="/add">Tambah</Link>
                </div>
            </div>
            <div className="border border-gray-500">
                <table className="table-auto min-w-full border">
                    <thead>
                        <tr>
                            <th className="border border-gray-500">#</th>
                            <th className="border border-gray-500">Nama</th>
                            <th className="border border-gray-500">Tanggal Lahir</th>
                            <th className="border border-gray-500">Tempat Tinggal</th>
                            <th className="border border-gray-500">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.map((item, index) => {
                                return (
                                    <tr key={"item" + index}>
                                        <td className="border text-center border-gray-500">{((data?.meta?.current_page - 1) * data?.meta?.per_page) + index + 1}</td>
                                        <td className="border text-center border-gray-500">{item?.name}</td>
                                        <td className="border text-center border-gray-500">{item?.dob}</td>
                                        <td className="border text-center border-gray-500">{item?.address}</td>
                                        <td className="border text-center border-gray-500">
                                            <button
                                                className="bg-red-500 text-white p-2 rounded m-2 text-[14px]"
                                                onClick={() => onDelete(item)}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end my-10">
                <nav aria-label="Page navigation">
                    <ul className="inline-flex -space-x-px">
                        {
                            data?.meta?.links?.map((item, index) => {
                                if (item?.label?.includes("Previous")) {
                                    return (
                                        <li key={"pagination-" + index}>
                                            <button
                                                disabled={data?.meta?.current_page === 1}
                                                className="py-2 px-3 ml-0 leading-tight text-white rounded-l-lg border border-gray-500 hover:bg-gray-700 hover:text-white"
                                                onClick={() => handlePageChange(data?.meta?.current_page - 1)}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                    )
                                } else if (item?.label?.includes("Next")) {
                                    return (
                                        <li key={"pagination-" + index}>
                                            <button
                                                disabled={data?.meta?.current_page === data?.meta?.last_page}
                                                className="py-2 px-3 leading-tight text-white rounded-r-lg border border-gray-500 hover:bg-gray-700 hover:text-white"
                                                onClick={() => handlePageChange(data?.meta?.current_page + 1)}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={"pagination-" + index}>
                                            <button
                                                className="py-2 px-3 leading-tight text-white border border-gray-500 hover:bg-gray-700 hover:text-white"
                                                onClick={() => handlePageChange(parseInt(item?.label))}
                                            >
                                                {item?.label}
                                            </button>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Home