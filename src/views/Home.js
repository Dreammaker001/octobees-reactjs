import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import usePerson from "../utils/hooks/usePerson";
import { checkResponseFetch } from "../utils/response";

const STATUS_LABEL = {
    1: {
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-300',
        label: 'WAITING'
    },
    2: {
        textColor: 'text-blue-700',
        bgColor: 'bg-blue-300',
        label: 'IN REPAIR'
    },
    3: {
        textColor: 'text-purple-700',
        bgColor: 'bg-purple-300',
        label: 'FIXED'
    },
    4: {
        textColor: 'text-green-700',
        bgColor: 'bg-green-300',
        label: 'COMPLETED   '
    },
}
const Home = () => {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    // Hooks
    const {getPerson} = usePerson()

    // State
    const [data, setData] = useState({
        data : [
            {
                number: "P000001",
                category: "Peralatan Dapur",
                outlet: "Papper Lunch",
                branch: "patimura",
                assigned_to: "Akbar",
                created_at: "01/11/2025",
                status: 1
            },
            {
                number: "P000002",
                category: "Elektronik",
                outlet: "Cafe Digital",
                branch: "sudirman",
                assigned_to: "Sinta",
                created_at: "02/11/2025",
                status: 2
            },
            {
                number: "P000003",
                category: "Furniture",
                outlet: "Resto Modern",
                branch: "setiabudi",
                assigned_to: "Rudi",
                created_at: "03/11/2025",
                status: 3
            },
            {
                number: "P000004",
                category: "Komputer",
                outlet: "Tech Cafe",
                branch: "jakarta",
                assigned_to: "Maya",
                created_at: "04/11/2025",
                status: 4
            },
            {
                number: "P000005",
                category: "Alat Tulis",
                outlet: "Office Supplies",
                branch: "bandung",
                assigned_to: "Adi",
                created_at: "05/11/2025",
                status: 1
            },
            {
                number: "P000006",
                category: "Peralatan Masak",
                outlet: "Dapur Impian",
                branch: "surabaya",
                assigned_to: "Dewi",
                created_at: "06/11/2025",
                status: 2
            },
            {
                number: "P000007",
                category: "Mesin Kantor",
                outlet: "Business Center",
                branch: "medan",
                assigned_to: "Budi",
                created_at: "07/11/2025",
                status: 3
            },
            {
                number: "P000008",
                category: "Peralatan Restoran",
                outlet: "Culinary Hub",
                branch: "bali",
                assigned_to: "Rina",
                created_at: "08/11/2025",
                status: 4
            },
            {
                number: "P000009",
                category: "Elektronik Rumah",
                outlet: "Home Tech",
                branch: "yogyakarta",
                assigned_to: "Joko",
                created_at: "09/11/2025",
                status: 1
            },
            {
                number: "P000010",
                category: "Perabotan Kantor",
                outlet: "Workspace Solution",
                branch: "surakarta",
                assigned_to: "Lia",
                created_at: "10/11/2025",
                status: 2
            },
            {
                number: "P000011",
                category: "Perlengkapan Dapur",
                outlet: "Kitchen World",
                branch: "semarang",
                assigned_to: "Agus",
                created_at: "11/11/2025",
                status: 3
            },
            {
                number: "P000012",
                category: "Elektronik Kantor",
                outlet: "Office Tech",
                branch: "palembang",
                assigned_to: "Nina",
                created_at: "12/11/2025",
                status: 4
            },
            {
                number: "P000013",
                category: "Furniture Kantor",
                outlet: "Workspace Design",
                branch: "makassar",
                assigned_to: "Hadi",
                created_at: "13/11/2025",
                status: 1
            },
            {
                number: "P000014",
                category: "Peralatan Cafe",
                outlet: "Coffee Corner",
                branch: "malang",
                assigned_to: "Sari",
                created_at: "14/11/2025",
                status: 2
            },
            {
                number: "P000015",
                category: "Elektronik Dapur",
                outlet: "Kitchen Tech",
                branch: "pontianak",
                assigned_to: "Wahyu",
                created_at: "15/11/2025",
                status: 3
            }
        ],
        meta: {
            current_page: 1,
            from: null,
            last_page: 2,
            links: [
              {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
              },
              {
                "url": "http://localhost:8000/api/v1/persons?page=1",
                "label": "1",
                "active": true
              },
              {
                "url": "http://localhost:8000/api/v1/persons?page=1",
                "label": "2",
                "active": true
              },
              {
                "url": null,
                "label": "Next &raquo;",
                "active": true
              }
            ],
            path: "http://localhost:8000/api/v1/persons",
            per_page: 10,
            to: null,
            total: 15
          }
    })
    const [message, setMessage] = useState(null)

    const fetchApi = async (page = 1, q= '') => {
        setMessage(null)
        try {
            const res = await getPerson({
                page: page,
                q: q
            })
            checkResponseFetch(navigate, res, () => {
                // setData(res.data)
            }, () => {
                setMessage({
                    type: 'err',
                    message: res?.message
                })
            })
        } catch(err) {
            setMessage({
                type: 'err',
                message: err?.response?.data?.message
            })
        }
    }


    // const onDelete = async (item) => {
    //     setMessage({
    //         type: 'success',
    //         message: "Berhasil Menghapus " + item?.name
    //     })

    //     const res = await axios.delete(`${API_URL}/api/v1/persons/${item?.id}`)
    //     if (res.status !== 200) {
    //         setMessage({
    //             type: 'err',
    //             message: res?.data?.message
    //         })
    //     }
    //     fetchApi(data?.meta?.current_page)
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const debouncedSearch = useCallback(
    //     debounce((searchValue) => {
    //         setSearchParams({ q: searchValue });
    //     }, 500),
    //     []
    // );

    // const handleSearch = (val) => {
    //     debouncedSearch(val)
    // }

    const handlePageChange = (pageNumber) => {
        setSearchParams({ page: pageNumber });
        let currentData = data
        currentData.meta.current_page = pageNumber
        if (pageNumber === 1){
            currentData.meta.links[0].active = false
            currentData.meta.links[3].active = true
        }else{
            currentData.meta.links[0].active = true
            currentData.meta.links[3].active = false
        }
        setData({...currentData})
    }

    useEffect(() => {
        const q = searchParams.get('q') || '';
        const page = searchParams.get('page') || 1;
        fetchApi(page, q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return (
        <div className="min-w-full min-h-full p-5 text-[14px]">
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
            {/* <div className="flex justify-between">
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
            </div> */}
            <div className="text-[34px] font-bold mb-5">Ticket</div>
            <div className="border border-gray-500 ooverflow-x-auto min-w-[741px]">
                <table className="table-auto min-w-full border ">
                    <thead>
                        <tr>
                            <th className="border border-gray-500">#</th>
                            <th className="border border-gray-500">Number</th>
                            <th className="border border-gray-500">Category</th>
                            <th className="border border-gray-500">Outlet</th>
                            <th className="border border-gray-500">Branch</th>
                            <th className="border border-gray-500">Assigned To</th>
                            <th className="border border-gray-500">Created At</th>
                            <th className="border border-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.slice(10 * (data?.meta?.current_page - 1), 10 * data?.meta?.current_page)?.map((item, index) => {
                                return (
                                    <tr key={"item" + index}>
                                        <td className="border text-center border-gray-500">{((data?.meta?.current_page - 1) * data?.meta?.per_page) + index + 1}</td>
                                        <td className="border text-center border-gray-500">{item?.number}</td>
                                        <td className="border text-center border-gray-500">{item?.category}</td>
                                        <td className="border text-center border-gray-500">{item?.outlet}</td>
                                        <td className="border text-center border-gray-500">{item?.branch}</td>
                                        <td className="border text-center border-gray-500">{item?.assigned_to}</td>
                                        <td className="border text-center border-gray-500">{item?.created_at}</td>
                                        <td className="border text-center border-gray-500">
                                            <div className={`m-2 rounded py-2 ${STATUS_LABEL[item?.status]?.textColor} ${STATUS_LABEL[item?.status]?.bgColor}`}>{STATUS_LABEL[item?.status]?.label}</div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center my-10">
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
                                                Prev
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