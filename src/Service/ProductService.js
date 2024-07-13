import axios from "axios"
import { axiosJwt } from "./UserService"

export const getAllProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`)
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}
export const getDetailProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-detail/${id}`)
    // console.log('««««« res.data »»»»»', res.data);
    return res.data
}

export const updateProduct = async (id, access_token, data) => {
    console.log('ID:', id);
    const res = await axiosJwt.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`,data, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJwt.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    return res.data
}