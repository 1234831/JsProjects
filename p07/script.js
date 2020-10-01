//Grab all dom elements
const word = document.getElementById('word');
const wrongwords = document.getElementById('wrong-words');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartButton = document.getElementById('restart');
const notification = document.getElementById('slider-container');

const hangmanParts = document.querySelectorAll('.hangman-part');

//an array of word pool

const wordPool = ['javascript', 'computer', 'facebook', 'youtube', 'hangman'];

//selected word from word pool

let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];
//array to classify the words on screen from user input
const correctLetters = [];
const incorrectLetters = ['a', 'x'];


//function to display the words on screen


function displySelectedWord() {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `
            )
            .join('')
        }
    `;
    //Show popup
    const wordText = word.innerText.replace(/\n/g, '' );
    
    if(wordText === selectedWord){
        message.innerText = 'you won';
        popup.style.display = 'flex';
    }
};


//Fuction to display the sliding notification
function showNotification(){
    notification.classList.add('show');

    setTimeout( () => {notification.classList.remove('show');}, 3000 );

}

//Function to update incorrect letters
function updatewrongwords(){
    //update the display wrong letters
    wrongwords.innerHTML = `
        ${incorrectLetters.length > 0 ? `<p>Wrong</p>` : ''}
        ${incorrectLetters.map( letter => `<span>${letter}</span>` )}
    `;

    //display the hangman parts on incorrect letters
    hangmanParts.forEach( (part,index) => {
        const error = incorrectLetters.length;

        if( index < error ){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });
    //show popup if lost
    if( incorrectLetters.length === hangmanParts.length ){
        message.innerText = 'You lost';
        popup.style.display = 'flex';
    }

}
//Event handlers
//1-Show notification for correct or incorrect messages

window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displySelectedWord();
            }else{
                showNotification();
            }
        }else{
            if(!incorrectLetters.includes(letter)){
                incorrectLetters.push(letter);
                updatewrongwords();
            }else{
                showNotification();
            }
        }
    }
})

//2-restart button listner
restartButton.addEventListener('click', () =>{
    //clear the array
    incorrectLetters.splice(0);
    correctLetters.splice(0);
    //get a new selected word from array
    selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    displySelectedWord();

    //clear the wrong letter div
    updatewrongwords();

    //hide popup

    popup.style.display = 'none';


})


displySelectedWord();