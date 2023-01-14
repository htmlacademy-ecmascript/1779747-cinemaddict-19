import dayjs from 'dayjs';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(min, max){
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

function getDescriptionRandom (description) {
  const desc = description.split('. ').map((i)=>i.replace(/\.*$/,'.'));
  let text = '';
  for (let i = 0; i <= Math.floor(Math.random() * desc.length); i++){
    text += `${getRandomArrayElement(desc)} `;
    text += ' ';
  }
  return text;
}

function getCommentsRandom (comments) {
  const commentArray = [];
  const numberComment = Math.floor(Math.random() * comments.length);
  for (let i = 0; i <= numberComment; i++){
    commentArray[i] = (Math.floor(Math.random() * comments.length));
  }
  return commentArray;
}

function humanizeTaskDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function humanizeDuration (duration) {
  const HOUR = 60;
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;

  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function getdescriptionSize (description) {
  return (description.length > 139) ? `${description.slice(0, 139)}...` : `${description}`;
}


export {getRandomArrayElement, getRandomNumber, getDescriptionRandom, getCommentsRandom, humanizeTaskDueDate, humanizeDuration, getdescriptionSize, getRandomBoolean };
