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

export const getWorkFlowDocs = async () => {
    const url = LINK + PATH + "get_work_flow_document.php";
    const data = {
        "APP_ID": "030820210318",
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

export const getActiveSession = async (version) => {
    const url = LINK + PATH + "get_active_session.php";
    const data = {
        "APP_ID": "030820210318",
        "VERSION_TYPE": version,        
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

export const endSession = async (version, processList) => {
    const url = LINK + PATH + "end_session.php";
    const data = {
        "APP_ID": "030820210318",
        "VERSION_TYPE": version,
        "PROCESS": processList
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

export const getWorkFlowData = async (docName, docNo) => {
    const url = LINK + PATH + "get_work_flow_data.php";
    const data = {
        "APP_ID": "030820210318",
        "DOC_NAME": docName,
        "DOC_NO": docNo
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

export const getWorkFlowLevels = async (docName) => {
    const url = LINK + PATH + "get_work_flow_lvl.php";
    const data = {
        "APP_ID": "030820210318",
        "DOC_NAME": docName,
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

export const updateWorkFlowLevels = async (docName, docNo, level) => {
    const url = LINK + PATH + "update_work_flow_level.php";
    const data = {
        "APP_ID": "030820210318",
        "DOC_NAME": docName,
        "DOC_NO": docNo,
        "LEVEL_NO": level,
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

export const getPreSaleData = async () => {
    const url = LINK + PATH + "pre_sale_check_sync.php";
    const data = {
        "APP_ID": "030820210318",
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

export const startSyncProcess = async () => {
    const url = LINK + "sis_app_v7/ora_sync_manual_2.php";
    const data = {
        "APP_ID": "030820210318",
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

export const getVehGatePassData = async (gatePassNo) => {
    const url = LINK + PATH + "get_gate_pass_dtl.php";
    const data = {
        "APP_ID": "030820210318",
        "GATE_PASS": gatePassNo,
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

export const updateVehGatePass = async (gatePassNo, vehicleGroup) => {
    const url = LINK + PATH + "update_gate_pass_vehicle_group.php";
    const data = {
        "APP_ID": "030820210318",
        "GATE_PASS": gatePassNo,
        "VEHICLE_GROUP": vehicleGroup,
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

export const getLockedSession = async () => {
    const url = LINK + PATH + "all_session_oracle.php";
    const data = {
        "APP_ID": "030820210318",
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