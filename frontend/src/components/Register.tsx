import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as types from "../types"
import HttpService from "../services/http.service"
// import { Store } from 'react-notifications-component';

export default function Register(): JSX.Element {
    const service = new HttpService()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<types.Dictionary<string>>({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    })

    const register = (): void => {
        if (formData.password !== formData.confirmPassword) {
            // Show error
            console.log("passwords don't match")
            return
        }

        service.post("auth/register/", formData)
            .then((res: any) => {
                console.log("successfully registered")
                // Store.addNotification({
                //     title: "Success",
                //     message: res.data.message,
                //     type: "success",
                //     insert: "top",
                //     container: "top-right",
                //     animationIn: ["animate__animated", "animate__fadeIn"],
                //     animationOut: ["animate__animated", "animate__fadeOut"],
                //     dismiss: {
                //         duration: 3000,
                //         onScreen: true
                //     }
                // });

                // Redirect to login
                navigate("/login")
                console.log(res.data)
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
                <h1 className="text-center">Register</h1>
                <form
                    onSubmit={() => {
                        register()
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
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }}
                        />
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    confirmPassword: e.target.value,
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
