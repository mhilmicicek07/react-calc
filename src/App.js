import './App.css';
import { useReducer } from 'react';
import DigitButton from './Components/DigitButton';
import OperationButton from './Components/OperationButton';

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DEL: "delete-digit",
  AC: "clear",
  CHOOSE_OPERATION: "choose_operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    //! 0 , 1 2 3 4 5 6 7 8 9 tuşları için
    case ACTIONS.ADD_DIGIT:
      //* sonradan eklenecek
      if (state.overwrite) {
        return {
          ...state,
          currScreen: payload.digit,
          overwrite: false,
        }
      }
      //* 0 ve , tuşu üst üste basılmaz
      if (payload.digit === "0" && state.currScreen === "0") {
        return state;
      }
      if (payload.digit === "," && state.currScreen.includes(",")) {
        return state;
      }
      //* varsayılan özellik currScreen içine tıklanan tuş yazdırma
      return {
        ...state,
        currScreen: `${state.currScreen || ""} ${payload.digit}`,
      }
    case ACTIONS.DEL:
      //! Del tuşu için
      //* işlemden sonra tuşa basılırsa sonucu sil yenile
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currScreen: null,
        }
      }
      //* currScreen boşsa işlem yok
      if (state.currScreen == null) {
        return state;
      }
      //* currScreen de yazan değer uzunluğu 1 ise currScreen i temizle 
      if (state.currScreen.length === 1) {
        return {
          ...state,
          currScreen: null,
        };
      }
      //* varsayılan özellik ekranda yazanın sonuncusunu sil
      return {
        ...state,
        currScreen: state.currScreen.slice(0, -1),
      }
    case ACTIONS.AC:
      //! Ac tuşu için
      //* currScreen,prevScreen,operation sıfırla
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      //! + - / yada * tuşları için
      //* hiçbir değer yoksa seçim yapma
      if (state.currScreen === null && state.prevScreen === null) {
        return state;
      }
      //* prevScreen dolu ama currScreen boşsa yapılacak operation değiştirme olucak
      if (state.currScreen === null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      //* prevScreen boşsa currScreen + operaiton prevScreen e al ve currScreen temizle
      if (state.prevScreen === null) {
        return {
          ...state,
          operation: payload.operation,
          prevScreen: state.currScreen,
          currScreen: null,
        }
      }
      //* varsayılan özellik her bir operation tuşuna basıldığında önceki değere ekleme yap ve yeni değer yazılması için currScreen i temizle
      return {
        ...state,
        prevScreen: evaluate(state),
        operation: payload.operation,
        currScreen: null,
      };
    case ACTIONS.EVALUATE:
      //! = tuşu için
      //* 3 değerden herhangi birisi yoksa işlem yapma
      if (state.operation == null || state.currScreen == null || state.prevScreen == null) {
        return state;
      }
      //* varsayılan özellik tüm işlemleri hesapla
      return {
        ...state,
        overwrite: true,
        prevScreen: null,
        operation: null,
        currScreen: evaluate(state),
      };
    //* sonradan eklenecek
  }
}

function evaluate({ currScreen, prevScreen, operation }) {
  const prev = parseFloat(prevScreen),
    current = parseFloat(currScreen);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let sonuc = "";
  switch (operation) {
    case "+":
      sonuc = prev + current;
      break;
    case "-":
      sonuc = prev - current;
      break;
    case "/":
      sonuc = prev / current;
      break;
    case "*":
      sonuc = prev * current;
      break;
  }
  return sonuc.toString();
}

function App() {
  const [{ currScreen, prevScreen, operation }, dispatch] = useReducer(reducer, {});
  return (
    <div className="App">
      <div className='calculator-wrapper'>
        <div className='screen-wrapper'>
          <div className='prev-screen'>{prevScreen} {operation}</div>
          <div className='curr-screen'>{currScreen}</div>
        </div>
        <button className='ac'
          onClick={() => dispatch({ type: ACTIONS.AC })}>AC</button>
        <button
          onClick={() => dispatch({ type: ACTIONS.DEL })}>DEL</button>
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="," dispatch={dispatch} />
        <button className='equal'
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
    </div>
  );
}

export default App;
