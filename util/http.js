import { LINK, PATH } from "../constants/Strings";

export async function login(empCode, password){    
    const url = LINK + PATH + "login.php";
    const data = {
        "EMP_CODE": empCode,
        "PASSWORD": password
    };
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json charset=utf-8",
        },
        body: JSON.stringify(data),
    }).catch(error => {
        console.log(error);
    });
    return response.text();
}

export async function getEmpProfile(empCode){
    const url = LINK + PATH + "emp_profile.php";
    const data = {
        "EMP_ID": empCode,
    };
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json charset=utf-8",
        },
        body: JSON.stringify(data),
    }).catch(error => {
        console.log(error);
    });
    return response.text();
}

export async function getUserRoles(empCode){
    const url = LINK + PATH + "user_roles.php";
    const data = {
        "EMP_ID": empCode,
    };
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json charset=utf-8",
        },
        body: JSON.stringify(data),
    }).catch(error => {
        console.log(error);
    });
    return response.text();
}

export async function getCOD(){
    const url = LINK + PATH + "get_cod_limit.php";
    
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json charset=utf-8",
        },        
    }).catch(error => {
        console.log(error);
    });
    return response.text();
}

export async function updateCODLimit(empCode, value){
    const url = LINK + PATH + "update_cod_limit.php";
    
    const data = {
        "EMP_ID": empCode,
        "COD_VALUE": value
    };

    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json charset=utf-8",
        },   
        body: JSON.stringify(data),     
    }).catch(error => {
        console.log(error);
    });
    return response.text();
}

export async function getWorkingDate(){
    const url = LINK + PATH + "get_working_date.php";
    
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json charset=utf-8",
        },        
    }).catch(error => {
        console.log(error);
    });
    return response.text();
}