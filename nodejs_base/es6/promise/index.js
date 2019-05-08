// 创建XHR的promise对象
function getURL(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
            } else {
                reject(req.statusText);
            }
        }
        req.onerror = function () {
            reject(new Error(req.statusText))
        }
        req.send();
    })
}
var URL = 'http://httpbin.org/get';
/**
 * 测试
 *  */

// getURL(URL)
//     .then((value)=>{console.log(value)})
//     .catch((error)=>{console.log(error)})

function getURLCallBack(URL,callback){
    var req=new XMLHttpRequest();
    req.open('GET',URL,true);
    req.onload=function(){
        if(req.status===200){
            callback(null,req.responseText);
        }else{
            callback(new Error(req.statusText),req.response);
        };
    }
    req.onerror=function(){
        callback(new Error(req.statusText))
    }
    req.send();
}
// 对json 数据进行安全解析
function jsonParse(callback,error,value){
    if(error){
        callback(error,value);
    }else{
        try {
            var result=JSON.parse(value);
            callback(null,result);
        } catch (error) {
            callback(error,value);
        }
    }
}

//发送 xhr请求
var request={
    comment:function getComment(callback){
        return getURLCallBack('http://azu.github.io/promises-book/json/comment.json',jsonParse.bind(null,callback))
    },
    people:function getPeople(callback){
        return getURLCallBack('http://azu.github.io/promises-book/json/people.json',jsonParse.bind(null, callback))        
    }
}
// 启动多个xhr请求

function allRequest(requests,callback,results){
    if(requests.length===0){
        return callback(null,results);
    }
    var req=requests.shift();
    req(function(error,value){
        if(error){
            callback(error,value);
        }else{
            results.push(value);
            allRequest(requests,callback,results);
        }
    })
}
function main(callback){
    allRequest([request.comment,request.people],callback,[]);
}
main(function(error,results){
    if(error){
        return console.log(error);
    }
    console.log(results);
})

