/*
* 本文介绍的一些常用的函数
*/

// 兼容Object的values函数
if (!Object.values) {
    Object.values = function (o) {
        if (o !== Object(o)) {
            throw new TypeError('Obect.keys called on a non-object.');
        } else {
            let k = [];
            for (let p in o) {
                if (Object.prototype.hasOwnProperty.call(o, p)) {
                    k.push(o[p]);
                }
            }
            return k;
        }
    }
}


// 设置string的字符串拼接format功能
if (typeof String.prototype.format != 'function') {
    String.prototype.format = function (args) {
        var result = this;

        if (arguments.length > 0) {
            // 字典类型的参数
            if (arguments.length == 1 && typeof(args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            // 字符串参数类型
            } else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i])
                    }
                }
            }
        }

        return result.replace("", "");
    }
}


// 设置Array的是否存在某个元素函数 hasElement
if (typeof Array.prototype.hasElement != 'function') {
    Array.prototype.hasElement = function (arg) {
        var res = this.find(function(e) {
            return e == arg;
        });
        return res == undefined ? false : true;
    }
}


// 设置Date的today函数，并且设置字符串表示
if (typeof Date.prototype.toDateTimeFormatString != 'function') {
    Date.prototype.toDateTimeFormatString = function (arg) {
        var result = this;
        return "{0}-{1}-{2} {3}:{4}:{5}".format(result.getFullYear(),
                result.getMonth()+1 < 10 ? "0"+(result.getMonth()+1) : result.getMonth()+1,
                result.getDate() < 10 ? "0"+result.getDate() : result.getDate(),
                result.getHours() < 10 ? "0"+result.getHours() : result.getHours(),
                result.getMinutes() < 10 ? "0"+result.getMinutes() : result.getMinutes(),
                result.getSeconds() < 10 ? "0"+result.getSeconds() : result.getSeconds());
    }
}

if (typeof Date.prototype.toDateFormatString != 'function') {
    Date.prototype.toDateFormatString = function (arg) {
        var result = this;
        return "{0}-{1}-{2}".format(
                result.getFullYear(),
                result.getMonth()+1 < 10 ? "0"+(result.getMonth()+1) : result.getMonth()+1,
                result.getDate() < 10 ? "0"+result.getDate() : result.getDate());
    }
}

if (typeof Date.prototype.toTimeFormatString != 'function') {
    Date.prototype.toTimeFormatString = function (arg) {
        var result = this;
        return "{0}:{1}:{2}".format(
                result.getHours() < 10 ? "0"+result.getHours() : result.getHours(),
                result.getMinutes() < 10 ? "0"+result.getMinutes() : result.getMinutes(),
                result.getSeconds() < 10 ? "0"+result.getSeconds() : result.getSeconds());
    }
}


// 将unicode编码字符串转换为中文
function reconvertFromUnicodeToChinese(str) {
    return str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
				return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
			})
			.replace(/(&#x)(\w{1,4});/gi, function ($0) {
				return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
			})
			.replace(/(&#)(\d{1,6});/gi, function ($0) {
				return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
			});
}