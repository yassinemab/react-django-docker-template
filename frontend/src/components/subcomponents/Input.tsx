import { Dictionary } from "@reduxjs/toolkit"
import React, { useState, useEffect } from "react"

export default function Input({
    style = {},
    type = "text",
    className = "",
    placeholder,
    label = "",
    onChange,
    invalidText = "",
    invalidTextStyle = {},
    labelStyle = {},
    invalid = null,
    value,
}: Dictionary<any>) {
    // Generic component for input fields. Can take a label, left and right icons,
    // and a function to validate the input.
    // Limitations: The first word of every label assigned to an
    // instance of this component has to be unique.

    const [valueInvalid, setValueInvalid]: any = useState(false)

    useEffect(() => {
        // If the invalid function is given as input, check if the value
        // conforms the function. If not set the valueInvalid state to true.
        if (invalid !== null) {
            const formValue = document.querySelector(
                `#input-${label.split(" ")[0].toLowerCase()}`
            ) as HTMLInputElement
            if (invalid(formValue.value) && formValue.value !== "") {
                setValueInvalid(true)
            } else {
                setValueInvalid(false)
            }
        }
    }, [value])

    return (
        <>
            <label style={{ ...labelStyle }}>{label}</label>

            <div style={{ ...style }}>
                <input
                    id={`input-${label.split(" ")[0].toLowerCase()}`}
                    type={type}
                    className={className}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                {valueInvalid && (
                    <div
                        style={{
                            marginBottom: "10px",
                            color: "#FF0000",
                            ...invalidTextStyle,
                        }}
                    >
                        {invalidText}
                    </div>
                )}
            </div>
        </>
    )
}
