import React from "react";
import { ACTIONS } from "../App";

const OperationButton = ({ dispatch, operation, active }) => {
    return (
        <button
            className={active ? "active" : ""}
            onClick={() =>
                dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
            }
        >
            {operation}
        </button>
    );
};

export default OperationButton;
