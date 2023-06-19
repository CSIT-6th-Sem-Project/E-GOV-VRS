import { faClose } from "@fortawesome/free-solid-svg-icons"

export const storeAuth = (auth) => {
    localStorage.setItem('auth_token',auth.token)
    localStorage.setItem('auth_expire',auth.expiry)
    localStorage.setItem('auth_user',JSON.stringify(auth.user))
}

export const fetchAuth = () => {
    
    let  auth  = {}
    auth.token = localStorage.getItem('auth_token');
    auth.expiry = localStorage.getItem('auth_expiry');
    auth.user = JSON.parse(localStorage.getItem('auth_user'));
    
    if(auth.token && auth.user){
       return auth;
    }
    return false
}


export const removeAuth = () =>{
    localStorage.removeItem('auth_expiry');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    // checks if credentials have been cleared from local storage
    if(localStorage.getItem('auth_token')){
        return false;
    }
    return true;
}