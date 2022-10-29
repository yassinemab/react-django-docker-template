import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as types from "../types"
import HttpService from "../services/http.service"
import Input from "./subcomponents/Input"

export default function Register(): JSX.Element {
    const service = new HttpService()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<types.Dictionary<any>>({
        email: {
            value: "",
            invalid: (value: string) => {
                return value.length < 5
            },
        },
        name: {
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
        confirmPassword: {
            value: "",
            invalid: (value: string) => {
                const password = document.querySelector("#input-password") as HTMLInputElement
                return value !== password.value
            },
        },
    })

    const register = (e: any): void => {
        e.preventDefault();
        service
            .post("auth/register/", {
                email: formData.email.value,
                name: formData.name.value,
                password: formData.password.value,
            })
            .then((res: any) => {
                console.log("successfully registered")

                // Redirect to login
                navigate("/login")
                console.log(res.data)
            })
            .catch((res: any) => {
                // Show error
                console.log(res)
            })
    }

    return (
        <div className="d-flex auth-container">
            <div className="col-xl-4 col-md-8 col-sm-11 col-xs-11">
                <h1 className="text-center">Register</h1>
                <form
                    onSubmit={(e: any) => {
                        register(e)
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
                            type="text"
                            label="Name"
                            className="form-control"
                            placeholder="Yassine"
                            value={formData.name.value}
                            invalid={formData.name.invalid}
                            invalidText="name must be at least 2 characters long"
                            onChange={(e: any) => {
                                setFormData({
                                    ...formData,
                                    name: {
                                        ...formData.name,
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
                            invalidText="Password must be at least 8 characters long"
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
                        <Input
                            style={{ marginBottom: "10px" }}
                            type="password"
                            label="Confirm password"
                            className="form-control"
                            placeholder="********"
                            value={formData.confirmPassword.value}
                            invalid={formData.confirmPassword.invalid}
                            invalidText="Confirm password must match password"
                            onChange={(e: any) => {
                                setFormData({
                                    ...formData,
                                    confirmPassword: {
                                        ...formData.confirmPassword,
                                        value: e.target.value,
                                    },
                                })
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div>
            <Link className="text-center" to="/login">
                Already have an account?
            </Link>
        </div>
    )
}
