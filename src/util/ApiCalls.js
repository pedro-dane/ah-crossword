import * as CONSTANT  from "./ApiConfig";


export async function get(url, header){        

        url = CONSTANT.SERVER_ADDRESS + url;        
        
        printCompleteRequest(url, header);
        if(header == undefined){
            header = {
                'accept': 'application/json'
            }
        }
        return fetch(url, {
                method:'GET',
                headers:header
        })
        .then((response) => {
            printResponse(response);
            return response.json()
        })
        .then(responseJson => {
          return responseJson
        })
        .catch(error => {
          return error
        });    
}

export async function post(url, body, header){
       
        url = CONSTANT.SERVER_ADDRESS + url;
        
        printCompleteRequest(url, body, header);
        if(header == undefined){
            header = {
                'accept': 'application/json'
            }
        }
        return fetch(url, {
                method:'POST',
                headers:header,
                body:body
        })
        .then((response) => {
            printResponse(response);
            return response.json()
        })
        .then(responseJson => {
          return responseJson
        })
        .catch(error => {
          return error
        });
}

export function postWithDefaultUrl(url, body, header){
    url = CONSTANT.SERVER_ADDRESS + url;
    printCompleteRequest(url, body, header);
    if(header == undefined){
        header = {
            'accept': 'application/json'
        }
    }
    return fetch(url, {
            method:'POST',
            headers:header,
            body:body
    })
    .then((response) => {
        printResponse(response);
        return response.json()
    })
    .then(responseJson => {
      return responseJson
    })
    .catch(error => {
      return error
    });
}


export function getWithDefaultUrl(url, header){
    url = CONSTANT.SERVER_ADDRESS + url;
    printCompleteRequest(url, header);
    if(header == undefined){
        header = {
            'accept': 'application/json'
        }
    }
    return fetch(url, {
            method:'GET',
            headers:header
    })
    .then((response) => {
        printResponse(response);
        return response.json()
    })
    .then(responseJson => {
      return responseJson
    })
    .catch(error => {
      return error
    });
}


export async function put(url, body, header){

        url = CONSTANT.SERVER_ADDRESS + url;
        
        printCompleteRequest(url, body, header);
        if(header == undefined){
            header = {
                'accept': 'application/json'
            }
        }
        return fetch(url, {
                method:'PUT',
                headers:header,
                body:body
        })
        .then((response) => {
            printResponse(response);
            return response.json()
        })
        .then(responseJson => {
          return responseJson
        })
        .catch(error => {
          return error
        });    
}


export async function del(url, body, header){
        
        url = CONSTANT.SERVER_ADDRESS + url;
        
        printCompleteRequest(url, body, header);
        if(header == undefined){
            header = {
                'accept': 'application/json'
            }
        }
        return fetch(url, {
                method:'DELETE',
                headers:header,
                body:body
        })
        .then((response) => {
            printResponse(response);
            return response.json()
        })
        .then(responseJson => {
          return responseJson
        })
        .catch(error => {
          return error
        });    
}

function printCompleteRequest(url, body, header){
    if(CONSTANT.DEBUG_LOG){
        console.log("Requested URL : "+ url);
        if(body){
            console.log("Body data : ");
            console.log(body);
        }
        console.log("Request header : ");
        console.log(header);
    }
}

function printResponse(responseData){
    if(CONSTANT.DEBUG_LOG){
        console.log("Response from server : ");
        console.log(responseData);
    }
}
