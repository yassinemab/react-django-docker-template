import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "react-notifications-component/dist/theme.css"
// import {ReactNotifications} from 'react-notifications-component'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <>
        {/* <ReactNotifications /> */}
        <App />
    </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
