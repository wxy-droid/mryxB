import Cookies from 'js-cookie';

// 添加cookie
export function setCook(data) {
    const arr = Object.entries(data);
    for (let i = 0; i < arr.length; i++) {
        Cookies.set(arr[i][0], arr[i][1]);
    }
    return true;
}

// 获取cookie
export function getCook(){
    return {
        appkey : Cookies.get('appkey'),
        email : Cookies.get('email'),
        role : Cookies.get('role'),
        username : Cookies.get('username'),
    }
}

// 删除cookie
export function removeCook(){
    Cookies.remove('appkey');
    Cookies.remove('email');
    Cookies.remove('role');
    Cookies.remove('username');
    return true;
}