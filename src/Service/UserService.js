import axios from "axios"

export const axiosJwt = axios.create()


export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`,data)
    return res.data
}
export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
    return res.data
}
export const registerUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`,data)
    return res.data
}
export const getDetailUser = async (id, access_token) => {
    const res = await axiosJwt.get(`${process.env.REACT_APP_API_URL}/user/get-detail/${id}`,{
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    return res.data
}
export const updateUser = async (id, data, access_token) => {
    const res = await axiosJwt.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`,data, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
    return res.data
}
export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`,{
        withCrendentials: true
    })
    return res.data
}