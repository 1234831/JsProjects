const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//All functions
//funtion to show error
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//funtion to show Success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
//function to check is email is valid or not

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//function to check if require fields have data
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value === '') {
            showError(input, `${getFieldId(input)} is required`);
        } else {
            showSuccess(input);
        }
    })

}
//function to get the field of the id in proper case
function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}




//This is an event listener form on submit
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);

})