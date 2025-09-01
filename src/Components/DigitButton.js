import React from "react";
import { ACTIONS } from "../App";

const DigitButton = ({ dispatch, digit, active }) => {
    return (
        <button
            className={active ? "active" : ""}
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
        >
            {digit}
        </button>
    );
};

export default DigitButton;
