import  fetch from 'node-fetch'
type ReqGithub={
    client_id:string;
    client_secret:String;
    code:String;
}
const requestGithubToken=(credentials:ReqGithub)=>
{
const { client_id, client_secret,code} = credentials
return fetch(
    'https://github.com/login/oauth/access_token',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(credentials)
    }
).then(res => res.json())
}
const requestGithubUserAccount=(token:string)=>
fetch(`https://api.github.com/user?access_token=${token}`)
.then(res => res.json())

export const authorizeWithGithub=async(credentials:ReqGithub)=>{
    const {access_token}=await requestGithubToken(credentials);
    console.log(access_token,'token');
    const githubUser=await requestGithubUserAccount(access_token);
    return {...githubUser,access_token}
}
