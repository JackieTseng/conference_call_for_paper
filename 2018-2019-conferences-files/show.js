window.onload=function(){
    document.querySelectorAll('tr').forEach(function(item) {
        var tds = item.querySelectorAll('td'),
            td = tds[3]
        try {
            var targetDate = Date.parse(td.innerText)
            if (targetDate < Date.now()) {
                td.style.color = 'gray'
                td.style.textDecoration = 'line-through'
            }
            else if (targetDate - Date.now() < 1000*60*60*24*100) {
                td.style.color = 'red'
                td.style.fontWeight = 'bolder'
                var delta = targetDate - Date.now()
                var days = Math.floor(delta/(24*60*60*1000))
                td.innerText = td.innerText + ' (' + days.toString() + ')'
            }
        }
        catch(e){}
    });
}
