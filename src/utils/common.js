function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min, max){
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}


export {getRandomArrayElement, getRandomNumber};
