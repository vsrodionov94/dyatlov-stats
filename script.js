const getStats = async () => {
  const url = 'https://api.vsrodionov.ru/getStats';
  const headers = {
    "Content-type": "application/json",
  };
  return fetch(url, {
    method: 'GET',
    headers: headers,
  }).then(data => data.json())
};

const setMainInfo = info => {
  const openedCount = document.querySelector('#opened');
  const usersCount = document.querySelector('#users');

  openedCount.textContent = info.openedCount;
  usersCount.textContent = info.usersCount;
};

const getTemplate = type => {
  const template = document.querySelector(`${type}`).content;
  const element = template.cloneNode(true);
  return element;
};

const generateDay = ({ keys, audio }, index) => {
   const element = getTemplate('#day-template');
   const id = element.querySelector('.day__id'); 
   const keysEl = element.querySelector('.day__keys');
   const audioEl = element.querySelector('.day__audio');
 
   id.textContent = index;
   keysEl.textContent = keys;
   audioEl.textContent = audio;
 
   return element;
}

const generateUser = ({ vkId, keys, artifacts }) => {
  const element = getTemplate('#user-template');
  const id = element.querySelector('.user__id'); 
  const keysEl = element.querySelector('.user__keys');
  const artifactsEl = element.querySelector('.user__artifacts');

  id.textContent = vkId;
  keysEl.textContent = keys;
  artifactsEl.textContent = artifacts;

  return element;
}

const createUsers = (users) => {
  const table = document.querySelector('.table');
  users.forEach(user => {
    table.append(generateUser(user));
  });
}

const createDays = (days) => {
   const table = document.querySelector('.days');
   days.forEach((day, index) => {
     table.append(generateDay(day, index + 1));
   });
 }


getStats().then(data => {
   setMainInfo(data.stats);
   createDays(data.stats.days);
   createUsers(data.users);
}); 


