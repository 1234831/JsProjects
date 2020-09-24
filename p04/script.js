//Get element from dom

const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip')
const rate = document.getElementById('rate');

//fetch exchange rate from third party api to update a dom
//www.exchangerate-api.com
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;

    fetch(`https://v6.exchangerate-api.com/v6/e040eb4be7ee753df5b57e2f/latest/${currencyOneCode}`)
        .then(res => res.json())
        .then(data => {
            //Get the exchange rate from api data
            const exchangeRate = data.conversion_rates[currencyTwoCode];


            //Display the conversion rate
            rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`
                //Apply conversion rate and Update amount of currency two
            currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);
        });

}
//Flip function to flip button to reverse the currency
function flip() {
    const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
}
//Event listners 
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipButton.addEventListener('click', flip);


calculate();