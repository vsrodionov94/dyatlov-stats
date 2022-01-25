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


const getUserInfo = async (vkId) => {
  const url = 'https://api.vsrodionov.ru/getUserInfo';
  const headers = {
    "Content-type": "application/json",
  };
  const data ={ vkId: vkId };
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: headers,
  }).then(data => data.json())
};

const setUserInfo = (data) => {
  const user_keys = document.querySelector('#user-keys');
  const user_artifacts = document.querySelector('#user-artifacts');
  const user_tryKeyCount = document.querySelector('#user-tryKeyCount');
  const user_tryAudioCount = document.querySelector('#user-tryAudioCount');
  const user_tryUserAnswerCount = document.querySelector('#user-tryUserAnswerCount');
  const user_tryUserSendCount = document.querySelector('#user-tryUserSendCount');
  const user_inviteCount = document.querySelector('#user-inviteCount');
  const user_lastDay = document.querySelector('#user-lastDay');
  const user_answerTwitch = document.querySelector('#user-answerTwitch');
  const user_tvKeyAnswered = document.querySelector('#user-tvKeyAnswered');
  user_keys.textContent = data.keys;
  user_artifacts.textContent = data.artifacts;
  user_tryKeyCount.textContent = data.tryKeyCount;
  user_tryAudioCount.textContent = data.tryAudioCount >= 0 ? data.tryAudioCount : 'Ввел верно';
  user_tryUserAnswerCount.textContent = data.tryUserAnswerCount;
  user_tryUserSendCount.textContent = data.tryUserSendCount;
  user_inviteCount.textContent = data.inviteCount;
  user_lastDay.textContent = data.lastDay + 1;
  user_answerTwitch.textContent = data.answerTwitch.join(', ');
  user_tvKeyAnswered.textContent = data.tvKeyAnswered ? 'Да' : 'Нет';

};

const form = document.querySelector('form');
const input = form.querySelector('input');
const btn = form.querySelector('button');

form.onsubmit = (evt) => {
  evt.preventDefault();
  if (input.value.length <= 0) return;
  const value = Number(input.value);
  getUserInfo(value).then(data => {
    if (!data) return alert('Пользователь не найден');
    setUserInfo(data);
  }).catch(() => alert('Что-то пошло не так'));
}


