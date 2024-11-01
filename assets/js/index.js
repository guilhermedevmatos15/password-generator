const inputNumber = document.querySelector(
   '.customize form input[type="number"]'
);
const inputRange = document.querySelector(
   '.customize form input[type="range"]'
);
const inputOptions = [
   ...document.querySelectorAll('.customize form input[type="checkbox"]'),
];
const passwordElement = document.querySelector('.password p');

// Conectando os inputs: Se altera um, mexe no outro.
inputNumber.addEventListener('input', (e) => {
   const value = Number.parseInt(e.target.value);

   if (value > 50) {
      e.target.value = 50;
   } else if (value < 1) {
      e.target.value = 1;
   }

   inputRange.value = value;
});
inputRange.addEventListener('input', (e) => {
   inputNumber.value = e.target.value;
});

function generatePassword() {
   const lenght = Number(inputRange.value);
   const options = {};

   inputOptions.forEach((input) => {
      options[input.getAttribute('id')] = input.checked;
   });
}

generatePassword();
