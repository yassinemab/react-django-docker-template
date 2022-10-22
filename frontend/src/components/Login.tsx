import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as types from "../types"
import HttpService from "../services/http.service"
import { setUser } from "../reducers/userReducer"
import { useDispatch } from "react-redux"

export default function Login() {
    const service = new HttpService()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<types.Dictionary<string>>({
        email: "",
        password: "",
    })

    const login = (e: any): void => {
        e.preventDefault()
        service
            .post("auth/login/", formData)
            .then((res: any) => {
                console.log("successfully logged in")

                // Set the user in the redux store
                const data = res.data.data
                dispatch(
                    setUser({
                        active: data.active,
                        name: data.name,
                        email: data.email,
                        id: data.id,
                    })
                )

                // Set the cookie
                document.cookie = `jwt=${res.data.data.token};`
                // Redirect to homepage
                navigate("/")
            })
            .catch((res: any) => {
              // Show error
                console.log("errorsss")
                console.log(res.data)
            })
    }

    return (
        <div className="d-flex auth-container">
            <div className="col-xl-4 col-md-8 col-sm-11 col-xs-11">
                <h1 className="text-center">Login</h1>
                <form
                    onSubmit={(e) => {
                        login(e)
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="name"
                            placeholder="Enter password"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}
