import axios from "axios"
import { Dictionary } from "../types"

const HEADERS: Dictionary<string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

export default class HttpService {
    apiUrl: string = `${process.env.REACT_APP_BACKEND_URL}/`

    post(path: string, data: Dictionary<any>) {
        const fullPath: string = this.apiUrl.concat(path)
        return axios.post(fullPath, data, {
            headers: HEADERS,
            withCredentials: true,
        })
    }

    get(path: string, params: Dictionary<any> | null = null) {
        const fullPath: string =
            this.apiUrl.concat(path) + this.formatQueryParams(params)
        return axios.get(fullPath, {
            headers: HEADERS,
            withCredentials: true,
        })
    }

    delete(path: string, params: Dictionary<any> | null = null) {
        const fullPath: string =
            this.apiUrl.concat(path) + this.formatQueryParams(params)
        return axios.delete(fullPath, {
            headers: HEADERS,
            withCredentials: true,
        })
    }

    put(path: string, data: Dictionary<any>) {
        const fullPath: string = this.apiUrl.concat(path)
        return axios.put(fullPath, data, {
            headers: HEADERS,
            withCredentials: true,
        })
    }

    patch(path: string, data: Dictionary<any>) {
        const fullPath: string = this.apiUrl.concat(path)
        return axios.patch(fullPath, data, {
            headers: HEADERS,
            withCredentials: true,
        })
    }

    formatQueryParams(params: Dictionary<string> | null) {
        let url = "?"
        for (let param in params) {
            url += `${param}=${params[param]}&`
        }
        return url
    }
}
