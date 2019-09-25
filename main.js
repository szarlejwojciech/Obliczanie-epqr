const defaultAnswers = () => {
  const array = [];

  for (let i = 0; i < 106; i++) {
    const id = i + 1;
    let type = '';
    let className = '';

    switch (id) {
      case 25:
      case 29:
      case 30:
      case 34:
      case 37:
      case 42:
      case 48:
      case 50:
      case 56:
      case 73:
      case 75:
      case 91:
      case 95:
        type = 'psyhotyzm-yes';
        className = 'psyhotyzm';

        break;
      case 2:
      case 5:
      case 7:
      case 9:
      case 12:
      case 14:
      case 18:
      case 21:
      case 41:
      case 54:
      case 59:
      case 64:
      case 68:
      case 79:
      case 81:
      case 85:
      case 88:
      case 96:
      case 99:
        type = 'psyhotyzm-no';
        className = 'psyhotyzm';

        break;

      case 1:
      case 6:
      case 11:
      case 16:
      case 20:
      case 28:
      case 36:
      case 40:
      case 45:
      case 51:
      case 55:
      case 58:
      case 61:
      case 63:
      case 67:
      case 69:
      case 72:
      case 78:
      case 90:
      case 94:
        type = 'extroversion-yes';
        className = 'extroversion';
        break;
      case 24:
      case 33:
      case 47:
        type = 'extroversion-no';
        className = 'extroversion';
        break;
      case 3:
      case 8:
      case 13:
      case 17:
      case 22:
      case 26:
      case 31:
      case 35:
      case 38:
      case 43:
      case 46:
      case 52:
      case 60:
      case 65:
      case 70:
      case 74:
      case 76:
      case 80:
      case 83:
      case 84:
      case 87:
      case 92:
      case 97:
      case 100:
        type = 'neuroticism-yes';
        className = 'neuroticism';
        break;
      case 15:
      case 23:
      case 39:
      case 62:
      case 86:
      case 98:
        type = 'lie-yes';
        className = 'lie';
        break;
      case 4:
      case 10:
      case 19:
      case 27:
      case 32:
      case 44:
      case 49:
      case 53:
      case 57:
      case 66:
      case 71:
      case 77:
      case 82:
      case 89:
      case 93:
        type = 'lie-no';
        className = 'lie';
        break;
      default:
        type = '';
        className = '';
        break;
    }
    const item = {
      id: i + 1,
      type: type,
      className: 'default',
      answer: 'none'
    }
    array.push(item);
  }
  return array;
}

const stens = {
  students: {
    male: {
      psyhotyzm: {
        '0': 1,
        '1': 1,
        '2': 1,
        '3': 2,
        '4': 3,
        '5': 3,
        '6': 4,
        '7': 4,
        '8': 5,
        '9': 5,
        '10': 6,
        '11': 6,
        '12': 7,
        '13': 7,
        '14': 8,
        '15': 8,
        '16': 8,
        '17': 9,
        '18': 9,
        '19': 10,
        '20': 10,
        '21': 10,
        '22': 10,
        '23': 10,
        '24': 10,
        '25': 10,
        '26': 10,
        '27': 10,
        '28': 10,
        '29': 10,
        '30': 10,
        '31': 10,
        '32': 10,
      }
    },
    female: {}
  }
}

const answers = (JSON.parse(localStorage.getItem('answers'))) || defaultAnswers();

const answersDiv = document.querySelector('.answers'),
  psyhoPosDiv = document.querySelector('.psyhotyzm-positive'),
  psyhoNegDiv = document.querySelector('.psyhotyzm-negative'),
  neuroPosDiv = document.querySelector('.neuroticism-positive'),
  neuroNegDiv = document.querySelector('.neuroticism-negative'),
  extroPosDiv = document.querySelector('.extroversion-positive'),
  extroNegDiv = document.querySelector('.extroversion-negative'),
  liePosDiv = document.querySelector('.lie-positive'),
  lieNegDiv = document.querySelector('.lie-negative');

const resultBtn = document.getElementById('result');
const resetBtn = document.getElementById('reset');

const calculateAnswers = array => {
  return [{
      items: array.filter(item => item.type === 'psyhotyzm-yes' && item.answer === "yes"),
      divName: psyhoPosDiv,
      group: "psyhotyzm"
    },
    {
      items: array.filter(item => item.type === 'psyhotyzm-no' && item.answer === "no"),
      divName: psyhoNegDiv,
      group: "psyhotyzm"
    },

    {
      items: array.filter(item => item.type === 'extroversion-yes' && item.answer === "yes"),
      divName: extroPosDiv,
      group: "extroversion"
    },

    {
      items: array.filter(item => item.type === 'extroversion-no' && item.answer === "no"),
      divName: extroNegDiv,
      group: "extroversion"
    },

    {
      items: array.filter(item => item.type === 'neuroticism-yes' && item.answer === "yes"),
      divName: neuroPosDiv,
      group: "neuroticism"
    },

    {
      items: array.filter(item => item.type === 'lie-yes' && item.answer === "yes"),
      divName: liePosDiv,
      group: "lie"
    },

    {
      items: array.filter(item => item.type === 'lie-no' && item.answer === "no"),
      divName: lieNegDiv,
      group: "lie"
    }
  ]
}

const renderPreview = (array) => {
  array.map(el => el.divName.innerHTML = el.items.map(item => `<li class="${item.className}">${item.id}</li>`).join(''))
}

const render = array => {
  answersDiv.innerHTML = array.map(item => `<button class="${item.className}" data-id="${item.id}" data-type="${item.type}" data-answer="${item.answer}" >${item.id}</button>`).join('');
  const newArray = calculateAnswers(array);
  renderPreview(newArray);
}
render(answers);


const changeAnswer = e => {
  if (e.target === answersDiv) return;
  const index = e.target.dataset.id - 1;

  if (answers[index].answer === 'none') {
    answers[index].answer = 'yes';
    answers[index].className = 'yes';
  } else if (answers[index].answer === 'yes') {
    answers[index].answer = 'no';
    answers[index].className = 'no';
  } else if (answers[index].answer === 'no') {
    answers[index].answer = 'none';
    answers[index].className = 'default';
  }
  localStorage.setItem('answers', JSON.stringify(answers));
  render(answers);
  document.querySelectorAll('.answers button')[index].focus();
}

const displayResult = (arr) => {
  const group = document.querySelector("#people-group").value;
  const gender = document.querySelector('[name="gender"]:checked').value;
  // const resultDiv= document.querySelector('.result-box');

  console.log(group, gender);


  const rawPsyhoResult = [...arr.filter(item => item.group === 'psyhotyzm')[0].items, ...arr.filter(item => item.group === 'psyhotyzm')[1].items].length;

  const rawExtroResult = [...arr.filter(item => item.group === 'extroversion')[0].items, ...arr.filter(item => item.group === 'extroversion')[1].items].length;

  const rawNeuroResult = [...arr.filter(item => item.group === 'neuroticism')[0].items].length;

  const rawLieResult = [...arr.filter(item => item.group === 'lie')[0].items, ...arr.filter(item => item.group === 'lie')[1].items].length;

  // const



  // console.log('psyhotyzm: ' + rawPsyhoResult, '\nextroversion: ' + rawExtroResult, '\nneuroticism: ' + rawNeuroResult, '\nlie: ' + rawLieResult);
}

const resetAnswers = array => {
  console.log(array);
  array.forEach(el => {
    el.className = "default";
    el.answer = "none";
  });
  console.log(array);

  localStorage.setItem('answers', JSON.stringify(array));
  render(array);
}

answersDiv.addEventListener('click', changeAnswer);
resultBtn.addEventListener('click', () => displayResult(calculateAnswers(answers)));
resetBtn.addEventListener('click', () => resetAnswers(answers));