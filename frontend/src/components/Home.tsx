import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../reducers/userReducer"

const Home: FC = (props): JSX.Element => {
    const user = useSelector(selectUser)

    return (
        <div className="centered-container" style={{ flexWrap: "wrap" }}>
            <h1 className="d-flex justify-content-center col-md-12">
                Welcome to the template. These are the standard routes
                available:
            </h1>
            <div
                className="mt-4 d-flex"
                style={{ width: "50%", justifyContent: "space-evenly" }}
            >
                <Link
                    className="link col-md-6 col-sm-12"
                    to={`/${user.active ? "logout" : "login"}`}
                >
                    {user.active ? "Logout" : "Login"}
                </Link>
                <Link className="link col-md-6 col-sm-12" to="/register">
                    Register
                </Link>
            </div>
            {user.active && (
                <>
                    <h2 className="mt-5 d-flex justify-content-center col-md-12">
                        User info
                    </h2>
                    <ul>Id: {user.id}</ul>
                    <ul>Name: {user.name}</ul>
                    <ul>Email: {user.email}</ul>
                </>
            )}
        </div>
    )
}

export default Home
