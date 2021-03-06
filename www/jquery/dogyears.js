/*jslint browser: true*/
/*global $, alert*/

var regs = localStorage.getItem('DogYears');
regs = JSON.parse(regs);
if (regs == null) { regs = [] };

function deleteAll(e)
{
    localStorage.clear();
    $("#igrade tbody tr").remove();   
    regs = [];
}

function calcAge(e)
{
    var iregs = regs.length+1;
    var age = document.getElementById('dogAge').value;
    age = age * 7;

    var record = JSON.stringify({
        recnum      :  iregs,
        human_age   :  document.getElementById('dogAge').value,
        dog_age     :  age
    });
    regs.push(record);
    localStorage.setItem('DogYears', JSON.stringify(regs));
    include_line(iregs,document.getElementById('dogAge').value,age);
}

function listAll(e)
{
    for (var i in regs) {
        var record = JSON.parse(regs[i]);
        include_line(record.recnum,record.human_age,record.dog_age);
    }
}

function include_line(recnum,human_age,dog_age)
{
    var cols = '',
    newRow = $("<tr>");
    cols += '<td data-recnum="'+ recnum +'">'+recnum+'</td>';
    cols += '<td>' + human_age + '</td>';
    cols += '<td>' + dog_age + '</td>';
    cols += '<td><button type="button" class="btn btn-danger btn-sm" onclick="deleteRecord(this)">Remover</button></td>';
    cols += '</tr>';
    newRow.append(cols);
    $('#igrade').append(newRow);
}

function deleteRecord(item)
{
    var tr = $(item).closest('tr'),
        index  = 0,
        id = parseInt(tr.find('td[data-recnum]').data('recnum'));
        
    for (var i in regs) {
        var record = JSON.parse(regs[i]);
        if (record.recnum == id) { index = i };
    }
    
    tr.fadeOut(200, function () {
        tr.remove();
        regs.splice(index,1);
        localStorage.setItem('DogYears',JSON.stringify(regs));
    });
    
}

function callAnotherPage(path) {
    window.location = path;
}
