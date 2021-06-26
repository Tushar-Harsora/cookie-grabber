let name = "Tushar Harsora"

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({name});
	console.log("Hello ", `name: ${name}`);
})

function getAllCookies() {
	return chrome.cookies.getAll({domain: "codeforces.com",}).then((cookies) => {
		return cookies;
	});
}

chrome.action.onClicked.addListener(() => {
	const cookies = getAllCookies();
	cookies.then((cookies) => {
		fetch('http://localhost:1337', {
			method: "POST",
			body: JSON.stringify(cookies)
		}).then(r => r.text()).then(result => {
		    console.log(result);
		})
	})/*
	let data = `name=${name}`

	const req = new XMLHttpRequest();
	const url = "http://localhost:1337"

	req.open("POST", url, true);
	req.onreadystatechange = function() { // Call a function when the state changes.
		if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
			console.log("Got response 200!");
		}
	}
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.send(data);*/
})