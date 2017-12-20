export function post(url, data){
	const init = {
		method: 'post',
		body: JSON.stringify(data),
		headers: {'Content-Type': 'application/json'},
		credentials: 'include'
	}

	return fetch(url, init)           //这里一定要返回
		.then(function(res){
			return res.json()
		})
		.then(function(res){
			return res;
		})
		.catch(function(err){
			console.log(err);
		})
}

