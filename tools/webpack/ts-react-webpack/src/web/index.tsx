class People{
    private data;
    constructor(data){
        this.data=data;
    }
    log(){
        console.log(this.data);
    }
}
new People({name:"cc"}).log();

// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import App from './pages/App'
// ReactDom.render(<App/>,document.getElementById('root'))
