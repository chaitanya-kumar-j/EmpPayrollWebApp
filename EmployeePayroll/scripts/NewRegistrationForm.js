// Name input
var empName;
const empNameElement = document.getElementById('name');
empNameElement.addEventListener('change', function (event) {
    empName = event.target.value;
})

// Profile input
var profile = null;
const profileElement = document.getElementsByName('profile');
for (var i = 0; i < profileElement.length; i++) {
    profileElement[i].addEventListener('change', function () {
        if (this.value !== profile) {
            profile = this.value;
        }
    });
}

// Gender input
var gender = null;
var genderElement = document.getElementsByName('gender');
for (var i = 0; i < genderElement.length; i++) {
    genderElement[i].addEventListener('change', function () {
        if (this.value !== gender) {
            gender = this.value;
        }
    });
}

// Department input
var checkboxes = document.querySelectorAll("input[type=checkbox][class=checkbox]");
let departments = []
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        departments =
            Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
    })
});

// salary input
var slide = document.getElementById('slide'),
    sliderDiv = document.getElementById("sliderAmount");
var salary;
slide.onchange = function () {
    sliderDiv.innerHTML = this.value;
    salary = this.value;
}

// Note input
var note;
const noteElement = document.getElementById("notes");
noteElement.addEventListener('change', function (event) {
    note = event.target.value;
})


// on submit function
function save() {
    //Starting date input
    var day = document.getElementById('day').value;
    var month = document.getElementById('month').value;
    var year = document.getElementById('year').value;
    var startDate = new Date(year, month, day).toJSON()

    let newEmp = {
        'name': empName,
        'profile': profile,
        'gender': gender,
        'department': departments,
        'salary': salary,
        'start date': startDate,
        'note': note
    }
    var id = localStorage.getItem('oldEmpId');
    if(id !== null){
        $.ajax({
            type: 'put',
            url: 'http://localhost:3000/employees/'+String(id),
            data: JSON.stringify(newEmp),
            contentType: "application/json; charset=utf-8"
        }).done(function () {
            console.log('SUCCESS');
        }).fail(function (msg) {
            console.log('FAIL');
        }).always(function (msg) {
            console.log('ALWAYS');
        });
        localStorage.clear()
    }
    else{
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/employees',
            data: JSON.stringify(newEmp),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                console.log(result)
            }
        });
    }
}

