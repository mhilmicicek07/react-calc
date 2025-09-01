import "./App.css";
import { useReducer, useEffect, useState } from "react";
import DigitButton from "./Components/DigitButton";
import OperationButton from "./Components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DEL: "delete-digit",
  AC: "clear",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

const initialState = {
  currScreen: null,
  prevScreen: null,
  operation: null,
  overwrite: false,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currScreen: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.currScreen === "0") {
        return state;
      }

      if (payload.digit === "," && state.currScreen?.includes(",")) {
        return state;
      }

      return {
        ...state,
        currScreen: `${state.currScreen || ""}${payload.digit}`,
      };

    case ACTIONS.DEL:
      if (state.overwrite) {
        return {
          ...state,
          currScreen: null,
          overwrite: false,
        };
      }

      if (state.currScreen == null) return state;

      if (state.currScreen.length <= 1) {
        return { ...state, currScreen: null };
      }

      return {
        ...state,
        currScreen: state.currScreen.slice(0, -1),
      };

    case ACTIONS.AC:
      return initialState;

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currScreen == null && state.prevScreen == null) return state;

      if (state.currScreen == null) {
        return { ...state, operation: payload.operation };
      }

      if (state.prevScreen == null) {
        return {
          ...state,
          operation: payload.operation,
          prevScreen: state.currScreen,
          currScreen: null,
        };
      }

      return {
        ...state,
        prevScreen: evaluate(state),
        operation: payload.operation,
        currScreen: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currScreen == null ||
        state.prevScreen == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        prevScreen: null,
        operation: null,
        currScreen: evaluate(state),
      };

    default:
      return state;
  }
}

function evaluate({ currScreen, prevScreen, operation }) {
  const prev = parseFloat(prevScreen.replace(",", "."));
  const current = parseFloat(currScreen.replace(",", "."));

  if (isNaN(prev) || isNaN(current)) return "";

  let result;
  switch (operation) {
    case "+": result = prev + current; break;
    case "-": result = prev - current; break;
    case "/": result = prev / current; break;
    case "*": result = prev * current; break;
    default: return "";
  }

  return result.toString().replace(".", ",");
}

function App() {
  const [{ currScreen, prevScreen, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [activeKey, setActiveKey] = useState(null);

  // ⌨️ Klavye numpad ve kısayol desteği + vurgulama
  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      let dispatched = false;

      // Sayılar (0-9)
      if (/^[0-9]$/.test(key)) {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: key } });
        dispatched = true;
      }

      // Virgül / Nokta
      if (key === "," || key === ".") {
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "," } });
        dispatched = true;
      }

      // İşlemler
      if (["+", "-", "*", "/"].includes(key)) {
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: key } });
        dispatched = true;
      }

      // Enter veya = → Hesapla
      if (key === "Enter" || key === "=") {
        dispatch({ type: ACTIONS.EVALUATE });
        dispatched = true;
      }

      // Backspace → DEL
      if (key === "Backspace") {
        dispatch({ type: ACTIONS.DEL });
        dispatched = true;
      }

      // Escape → AC
      if (key === "Escape") {
        dispatch({ type: ACTIONS.AC });
        dispatched = true;
      }

      // Eğer bir işlem yapıldıysa kısa süreli vurgulama
      if (dispatched) {
        setActiveKey(key);
        setTimeout(() => setActiveKey(null), 150);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="App">
      <div className="calculator-wrapper">
        <div className="screen-wrapper">
          <div className="prev-screen">
            {prevScreen} {operation}
          </div>
          <div className="curr-screen">{currScreen}</div>
        </div>

        <button
          className={`ac ${activeKey === "Escape" ? "active" : ""}`}
          onClick={() => dispatch({ type: ACTIONS.AC })}
        >
          AC
        </button>
        <button className={activeKey === "Backspace" ? "active" : ""} onClick={() => dispatch({ type: ACTIONS.DEL })}>
          DEL
        </button>
        <OperationButton operation="/" dispatch={dispatch} active={activeKey === "/"} />

        <DigitButton digit="7" dispatch={dispatch} active={activeKey === "7"} />
        <DigitButton digit="8" dispatch={dispatch} active={activeKey === "8"} />
        <DigitButton digit="9" dispatch={dispatch} active={activeKey === "9"} />
        <OperationButton operation="*" dispatch={dispatch} active={activeKey === "*"} />

        <DigitButton digit="4" dispatch={dispatch} active={activeKey === "4"} />
        <DigitButton digit="5" dispatch={dispatch} active={activeKey === "5"} />
        <DigitButton digit="6" dispatch={dispatch} active={activeKey === "6"} />
        <OperationButton operation="+" dispatch={dispatch} active={activeKey === "+"} />

        <DigitButton digit="1" dispatch={dispatch} active={activeKey === "1"} />
        <DigitButton digit="2" dispatch={dispatch} active={activeKey === "2"} />
        <DigitButton digit="3" dispatch={dispatch} active={activeKey === "3"} />
        <OperationButton operation="-" dispatch={dispatch} active={activeKey === "-"} />

        <DigitButton digit="0" dispatch={dispatch} active={activeKey === "0"} />
        <DigitButton digit="," dispatch={dispatch} active={activeKey === "," || activeKey === "."} />

        <button
          className={`equal ${activeKey === "Enter" || activeKey === "=" ? "active" : ""}`}
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
