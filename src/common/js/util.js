export function urlParse() {
    let url = window.location.search
    let obj = {}
    let reg = /[?&][^?&]+=[^?&]+/g
    let arr = url.match(reg)
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.slice(1).split('=')
            let key = decodeURIComponent(tempArr[0])
            let val = decodeURIComponent((tempArr[1]))
            obj[key] = val
        })
    }

    return obj
}
