window.onload=function(){
    document.querySelectorAll('tr').forEach(function(item) {
        var tds = item.querySelectorAll('td'),
            td = tds[3]
        try {
            var targetDate = Date.parse(td.innerText)
            if (targetDate - Date.now() < 1000*60*60*24*60) {
                td.style.color = 'red'
                td.style.fontWeight = 'bolder'
            }
        }
        catch(e){}
    });
}
