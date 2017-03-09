export function formateDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        let $1 = RegExp.$1
        fmt = fmt.replace($1, String(date.getFullYear()).slice(4 - $1.length))
    }

    var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let $1 = RegExp.$1
            let str = String(o[k])
            fmt = fmt.replace($1, $1.length === 1 ? str : padLeftZero(str))
        }
    }

    return fmt
}

function padLeftZero(str) {
    return ('00' + str).slice(str.length)
}
