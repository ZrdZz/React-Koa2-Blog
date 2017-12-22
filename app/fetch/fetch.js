export function post(url, data){
    var init = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},   
    }

    return fetch(url, init)
            .then(function(res){
                return res.json() ; //注意要返回;
            })
            .then(function(res){
                return(res);
            })
            .catch(function(err){
                console.log(err);
            })
}


export function get(url){
    var init = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        credentials: 'include'   
    }

    return fetch(url, init)
            .then(function(res){
                return res.text();
            })
            .then(function(res){
                return res;
            })
            .catch(function(err){
                console.log(err);
            })
}