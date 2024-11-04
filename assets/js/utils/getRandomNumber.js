const getRandomNumber = (min = 0, max = 1) =>
   Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
   Math.ceil(min);

export default getRandomNumber;
