function get_H_Index(x){
    var tds = x.querySelectorAll('td')
    td = tds[6]
    if (td.innerText == "H-Index"){
        return -10000;
    }

    items = td.innerText.split(" - ");

    var delta = 0;
    try {
        delta = parseInt(td.innerText);
    }
    catch(e){}

    if (isNaN(delta)){
        delta = 0;
    }else {
        delta = -1 * delta;
    }

    return delta;
}

function get_conference_time(x){
    var tds = x.querySelectorAll('td')
    td = tds[4]
    if (td.innerText == "Conference Date"){
        return -1;
    }

    items = td.innerText.split(" - ");

    var delta = 36600;
    try {
        var targetDate = Date.parse(items[1]);
        if (targetDate < Date.now()) {
            delta = -1
        }
        else {
            delta = targetDate - Date.now();
            delta = Math.floor(delta/(24*60*60*1000))
        }
    }
    catch(e){}

    if (delta < 0){
        delta = 36700;
    }    

    if (isNaN(delta)){
        delta = 36600;
    }

    return delta;
}


function get_submission_time(x){
    var tds = x.querySelectorAll('td')
    td = tds[3]
    if (td.innerText == "Submission Deadline"){
        return -1;
    }

    var delta = 36600;
    try {
        var targetDate = Date.parse(td.innerText)
        if (targetDate < Date.now()) {
            delta = -1
        }
        else {
            delta = targetDate - Date.now()
            delta = Math.floor(delta/(24*60*60*1000))
        }
    }
    catch(e){}

    if (delta < 0){
        delta = 36700;
    }    

    if (isNaN(delta)){
        delta = 36600;
    }

    return delta;
}

function cmp(x, y){
    var tx = get_time(x);
    var ty = get_time(y);
    var idx = get_idx(x);
    var idy = get_idx(y);
    if(tx < ty)return true;
    if(tx > ty)return false;
    return idx - idy;
}    

function makeSortable_by_SubmissionDeadline() {
    var table=document.getElementsByTagName("table")[0];    
    var flag=false;

    var tbody=table.tBodies[0];
    var rows=tbody.getElementsByTagName("tr");
    rows=Array.prototype.slice.call(rows,0);

    rows.sort(function(x,y){
        var tx = get_submission_time(x);
        var ty = get_submission_time(y);
        return tx - ty;

    });
    for(var i=0;i<rows.length;i++){
        tbody.appendChild(rows[i]);
    }

}

function makeSortable_by_H_Index() {
    var table=document.getElementsByTagName("table")[0];    
    var flag=false;

    var tbody=table.tBodies[0];
    var rows=tbody.getElementsByTagName("tr");
    rows=Array.prototype.slice.call(rows,0);

    rows.sort(function(x,y){
        var tx = get_H_Index(x);
        var ty = get_H_Index(y);
        return tx - ty;

    });
    for(var i=0;i<rows.length;i++){
        tbody.appendChild(rows[i]);
    }

}

function makeSortable_by_ConferenceDate() {
    var table=document.getElementsByTagName("table")[0];    
    var flag=false;

    var tbody=table.tBodies[0];
    var rows=tbody.getElementsByTagName("tr");
    rows=Array.prototype.slice.call(rows,0);

    rows.sort(function(x,y){
        var tx = get_conference_time(x);
        var ty = get_conference_time(y);
        return tx - ty;

    });
    for(var i=0;i<rows.length;i++){
        tbody.appendChild(rows[i]);
    }

}

function get_on_click(){
    var table=document.getElementsByTagName("table")[0];
    var t_hand=document.getElementsByTagName('tr')[0];
    var tds = t_hand.querySelectorAll('td');    
    tds[3].onclick = makeSortable_by_SubmissionDeadline;
    tds[4].onclick = makeSortable_by_ConferenceDate;
    tds[6].onclick = makeSortable_by_H_Index;
}

window.onload=function(){
    var table=document.getElementsByTagName("table")[0];
    get_on_click();
    document.querySelectorAll('tr').forEach(function(item) {
        var tds = item.querySelectorAll('td'),
            td = tds[3]
        try {
            var targetDate = Date.parse(td.innerText)
            if (targetDate < Date.now()) {
                td.style.color = 'gray'
                td.style.textDecoration = 'line-through'
            }
            else if (targetDate - Date.now() < 1000*60*60*24*120) {
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
