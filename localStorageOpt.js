/*
 * localStorage operation: set key/value, get key, delete key, clear all key
 */

let localStorageOpt = {
	expire:  1000 * 60 * 60 * 24,  // default one day expire time
	setValue: function (key, value) {
		let data = JSON.stringify({
			time: new Date().getTime(),
			data: value
		});
		window.localStorage.setItem(key, data);
	},
	getValue: function (key, exp=this.expire) {
		let data = window.localStorage.getItem(key);
		
		if (data == null) {
			return {result: false, message: 'key not exist'};
		}
		
		let dataObj = JSON.parse(data);
		if (new Date().getTime() - dataObj.time > this.expire) {
			return {result: false, messge: 'key expired'};
		} else {
			return {result: true, data: JSON.parse(dataObj.data), message: 'get data from localStorage success'};
		}		
	},
	delValue: function (key) {
		window.localStorage.removeItem(key);
	},
	clearStorage: function () {
		window.localStorage.clear();
	}
}
