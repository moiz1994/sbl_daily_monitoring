import { LINK, PATH } from "../constants/Strings";

export const login = async (empCode, password) => {
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

export const getEmpProfile = async (empCode) => {
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

export const getUserRoles = async (empCode) => {
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

export const getCOD = async () => {
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

export const updateCODLimit = async (empCode, value) => {
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

export const getWorkingDate = async () => {
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

export const getSaleDifference = async (saleDate) => {
    const url = LINK + PATH + "get_sale_difference.php";
    const data = {
        "SALE_DATE": saleDate,
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

export const getDistributorList = async () => {
    const url = LINK + PATH + "get_distributor_list.php";
    
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

export const updateDistributorStatus = async (distCode, remarks, status) => {
    const url = LINK + PATH + "update_distribution_status.php";
    const data = {
        "CUSTOMER_ID": distCode,
        "REMARKS": remarks,
        "ACTIVE_STATUS": status,
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

export const getSaleDateTimerData = async () => {
    const url = LINK + PATH + "get_timer_data.php";
    
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

export const updateSaleDate = async (time, curDate, empCode) => {
    const url = LINK + PATH + "update_sale_date.php";
    const data = {
        "time": time,
        "curDate": curDate,
        "empCode": empCode,
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