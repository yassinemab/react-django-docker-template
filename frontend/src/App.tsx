import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./style.scss"
import HttpService from "./services/http.service"
import { useDispatch } from "react-redux"
import { setUser } from "./reducers/userReducer"

import Home from "./components/Home"
import NotFound from "./components/NotFound"
import Login from "./components/Login"
import Register from "./components/Register"
import Logout from "./components/Logout"

function App() {
    const service: HttpService = new HttpService()
    const dispatch = useDispatch()
    useEffect(() => {
        service
            .get("auth/user/")
            .then((res: any) => {
                dispatch(
                    setUser({
                        active: res.data.data.active,
                        name: res.data.data.name,
                        email: res.data.data.email,
                        id: res.data.data.id,
                    })
                )

                // Create a context for the user, so every component can access the
                // user if wanted.
            })
            .catch((res: any) => {
                // Show error
                console.log(res)
            })
    })

    return (
        <Router>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
