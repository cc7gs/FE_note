import * as React from 'react';
const { useContext, createContext, useReducer } = React;


export default function createStore(params) {
    const { initState = {} } = params;
    //创建状态管理，由context管理state
    const AppContext = createContext(initState);
    const store = {
        _state: initState,
        dispatch: undefined,
        getState: () => {
            return store._state
        },
        useContext: () => {
            return useContext(AppContext)
        }
    };
    //将reducer逻辑抽离到外面处理
    function reducer(state,action){
       const nextState= reducerInAction(state,action)
       store._state=nextState;
       return nextState
    }
    const Provider = props => {
        const [state, dispatch] = useReducer(reducer, initState);
        if (!store.dispatch) {
            store.dispatch = async (action) => {
                if(typeof action==='function'){
                    await action(dispatch,store.getState());
                }else{
                    dispatch(action)
                }
            }
        }
        return <AppContext.Provider {...props} value={state} />
    }
    return {
        Provider,
        store
    }
}
//处理状态 并返回状态
function reducerInAction(state,action){
    if(typeof action.reducer==='function'){
        return action.reducer(state)
    }else{
        return state
    }
}