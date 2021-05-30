import * as React from 'react';
import createStore from './createStore'
const { Provider, store } = createStore({ initState: { name: 'cc', age: 23 } });

function actionOfAdd() {
    return {
        type: 'add',
        reducer(state) {
            return {
                ...state,
                age: state.age + 1
            }
        }
    }
}
function timeOutAdd(age){
    return new Promise((resolve)=>setTimeout(()=>resolve(age+1),300))
}
const  asyncActionOfDec=()=>async(dispatch,ownState)=>{
    const age=await timeOutAdd(ownState.age);
    dispatch({
        type:'dec',
        reducer(state){
            return{
                ...state,
                age
            }
        }
    })
}
function actionOfDec() {
    return { type: 'dec',reducer(state){
        return{
            ...state,
            age:state.age-1
        }
    } }
}
const Button = () => {
    const handleAdd = () => {
        store.dispatch(actionOfAdd())
    }
    const handleDecrease = () => {
        store.dispatch(actionOfDec())
    }
    const handleAsyncDec=()=>{
        store.dispatch(asyncActionOfDec())
    }
    return (
        <>
            <button onClick={handleDecrease}>-1</button>
            <button onClick={handleAsyncDec}> async -1</button>
            <button onClick={handleAdd}>+1</button>
        </>
    )
}
const Home = () => {
    const state = store.useContext();
    return (<div>
        <p>home</p>
        {state.name}-{state.age}
        <br />
        <Button />
    </div>)
}
const WrapHome = () => {
    return (
        <Provider>
            <Home />
        </Provider>)
}
export default WrapHome;