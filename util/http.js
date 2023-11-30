const LINK = 'http://mailserver.sukkurbeverages.net:689/';
const PATH = 'daily_monitoring_app_react/';

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