import getRandomNumber from './utils/getRandomNumber.js';
import {
   alphabetLower,
   alphabetUpper,
   numbers,
   specialCharacters,
} from './data/characters.js';
import evaluatePasswordStrength from './utils/evaluatePasswordStrength.js';

const inputNumber = document.querySelector(
   '.customize form input[type="number"]'
);
const inputRange = document.querySelector(
   '.customize form input[type="range"]'
);
const inputOptions = [
   ...document.querySelectorAll('.customize form input[type="checkbox"]'),
];

// Conectando os inputs: Se altera um, mexe no outro.
inputNumber.addEventListener('input', (e) => {
   const value = Number.parseInt(e.target.value);

   if (value > 50) {
      e.target.value = 50;
   } else if (value < 1) {
      e.target.value = 1;
   }

   inputRange.value = value;
   generatePassword();
});
inputRange.addEventListener('input', (e) => {
   inputNumber.value = e.target.value;
   generatePassword();
});

const passwordElement = document.querySelector('.password p');
function generatePassword() {
   const lenght = Number(inputRange.value);
   let str = '';

   const options = {};
   inputOptions.forEach(
      (input) => (options[input.getAttribute('id')] = input.checked)
   );

   const allowedCharacters = [];
   options.uppercase && allowedCharacters.push(...alphabetUpper);
   options.lowercase && allowedCharacters.push(...alphabetLower);
   options.numbers && allowedCharacters.push(...numbers);
   options.simbols && allowedCharacters.push(...specialCharacters);

   for (let i = 1; i <= lenght; i++) {
      str +=
         allowedCharacters[getRandomNumber(0, allowedCharacters.length - 1)];
   }

   passwordElement.innerHTML = str;

   // Sorting string strength
   const statusBar = document.querySelector('.password .status');
   const strenght = evaluatePasswordStrength(str);

   if (strenght === 0 || strenght === 1) {
      statusBar.classList = 'status weak';
      console.log(strenght);
   } else if (strenght === 2) {
      statusBar.classList = 'status avarage';
      console.log(strenght);
   } else if (strenght === 3) {
      statusBar.classList = 'status strong';
      console.log(strenght);
   } else if (strenght === 4) {
      statusBar.classList = 'status very-strong';
      console.log(strenght);
   } else {
      statusBar.classList = 'status';
   }
}

generatePassword();

// Icons logic
const refreshIcon = document.querySelector('i.fa-arrows-rotate');
refreshIcon.addEventListener('click', () => {
   generatePassword();
});

const copyIcon = document.querySelector('i.fa-copy');
copyIcon.addEventListener('click', () => {
   navigator.clipboard.writeText(passwordElement.innerText);
   alert('Password copied!');
});

// InputOptions logic
// Ensuring that at least one of the inputs is checked
inputOptions.forEach((input) => {
   input.addEventListener('click', () => {
      const allUnchecked = inputOptions.every((input) => !input.checked);
      allUnchecked && (input.checked = true);
      generatePassword();
   });
});
