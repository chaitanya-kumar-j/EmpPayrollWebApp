
$(document).ready(function () {
    $.getJSON('http://localhost:3000/employees', function (data) {
        let employees = data;
        const table = $('#display');
        const columns = ["profile", "Name", "Gender", "Department", "Salary", "Start Date", "Actions"];
        $.each(employees, function (i, emp) {
            row = $('<tr>');
            $.each(columns, function (j, col) {
                if (col === 'Actions') {
                    $('<td>').html(`<img src="../assets/icons/delete-black-18dp.svg" onclick="deleteEmp(${emp.id})"><img src="../assets/icons/create-black-18dp.svg"  onclick="editEmp(${emp.id})">`).appendTo(row);
                }
                else if (col === 'profile') {
                    var imgUrl = emp[col.toLowerCase()].replace(/ /g, '%20')
                    $('<td>').html('<img src=' + imgUrl + '>').appendTo(row);
                }
                else if (col === 'Department') {
                    var depHtml = ''
                    $.each(emp[col.toLowerCase()], function (d, dep) {
                        depHtml += '<div class="dept-label">' + dep + '</div>'
                    })
                    $('<td>').html(depHtml).appendTo(row);
                }
                else {
                    $('<td>').html(emp[col.toLowerCase()]).appendTo(row);
                }
            })
            table.append(row);
        });
    });
});

function deleteEmp(id) {
    $.ajax({
        type: 'delete',
        url: 'http://localhost:3000/employees/' + String(id),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result)
        }
    });
}

function editEmp(id){
    $.getJSON("http://localhost:3000/employees/"+String(id), function(data){
        localStorage.setItem('oldEmpDetails', JSON.stringify(data))
        localStorage.setItem('oldEmpId', data.id)
        window.location.href = './NewRegistrationForm.html';
        // dataLoad();
        // function dataLoad() {
        //     if (localStorage.getItem('oldEmpDetails') !== null) {
        //         var inputParse = JSON.parse(localStorage.getItem('oldEmpDetails'));
        //         $.each(inputParse, function (key, value) {
        //             var field = document.getElementById(key);
        //             if(field.type == 'radio' || field.type == 'checkbox'){
        //                 field.checked = value;
        //             }else{
        //                 field.value = value;
        //             }
        //         });
        //     }
        // }
    })
}
