import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as types from "../types"
import axios from "axios"

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<types.Dictionary<string>>({
        email: "",
        password: "",
    })

    const login = (): void => {
        if (formData.password != formData.confirmPassword) {
            // Show error
            console.log("passwords don't match")
            return
        }

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/auth/register/`,
                formData
            )
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
                // Redirect to homepage
                navigate("/")
                console.log(res.data)
            })
            .catch((res: any) => {
                console.log("errorsss")
                console.log(res.data)
                // Show error
            })
    }

    return (
        <div className="d-flex auth-container">
            <div className="col-xl-4 col-md-8 col-sm-11 col-xs-11">
                <h1 className="text-center">Login</h1>
                <form
                    onSubmit={() => {
                        login()
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
