import * as React from 'react'
import Routes from '../routes'
import {BrowserRouter} from 'react-router-dom'
const App=()=>{
    return(
        <BrowserRouter baseName='/'>
        {Routes()}
        </BrowserRouter>
    )
}
export default App;