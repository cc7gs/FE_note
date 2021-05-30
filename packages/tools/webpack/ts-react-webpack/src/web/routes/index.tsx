import * as React from 'react';
const {Suspense,lazy}=React;
import {Switch,RouterProps,Route} from 'react-router-dom'
const Home=lazy(()=>import(/**webpackChunkName:"home" */"../components/Home"));
 const Routes=()=>(
    <Suspense fallback={<i>loading...</i>}>
        <Switch>
            {
                routes.map(r=>{
                    const {component:Component,...rest}=r;
                    return <Route  key={r.path} {...rest} render={()=><Component/>}/>
                })
            }
        </Switch>
    </Suspense>
 );

export default Routes;

const routes:RouterProps[]=[
    {
        path:'/',
        exact:true,
        component:Home
    }
]