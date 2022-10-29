import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as types from "../types"
import HttpService from "../services/http.service"
import { setUser } from "../reducers/userReducer"
import { useDispatch } from "react-redux"
import Input from "./subcomponents/Input"

export default function Login() {
    const service = new HttpService()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<types.Dictionary<any>>({
        email: {
            value: "",
            invalid: (value: string) => {
                return value.length < 5
            },
        },
        password: {
            value: "",
            invalid: (value: string) => {
                return value.length < 5
            },
        },
    })

    const login = (e: any): void => {
        e.preventDefault()
        service
            .post("auth/login/", {
                email: formData.email.value,
                password: formData.password.value,
            })
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
                        <Input
                            style={{ marginBottom: "10px" }}
                            label="Email"
                            type="email"
                            className="form-control"
                            placeholder="you@example.com"
                            value={formData.email.value}
                            invalid={formData.email.invalid}
                            invalidText="Email must be at least 5 characters long"
                            onChange={(e: any) => {
                                setFormData({
                                    ...formData,
                                    email: {
                                        ...formData.email,
                                        value: e.target.value,
                                    },
                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            style={{ marginBottom: "10px" }}
                            type="password"
                            label="Password"
                            className="form-control"
                            placeholder="********"
                            value={formData.password.value}
                            invalid={formData.password.invalid}
                            invalidText="Password must be at least 5 characters long"
                            onChange={(e: any) => {
                                setFormData({
                                    ...formData,
                                    password: {
                                        ...formData.password,
                                        value: e.target.value,
                                    },
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
