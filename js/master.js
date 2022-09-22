// if Local Storage Has Color
let mainColor = localStorage.getItem('--main-color');
const colorLi = document.querySelectorAll('.colors-list li');

if (mainColor) {
  document.documentElement.style.setProperty('--main-color', mainColor);
  colorLi.forEach((li) => {
    li.classList.remove('active');
    if (mainColor == li.dataset.color) {
      li.classList.add('active');
    }
  });
}

// Toggle Spin Class Icon
document.querySelector('.toggle-settings .fa-gear').onclick = function () {
  this.classList.toggle('fa-spin');
  this.parentElement.parentElement.classList.toggle('open');
};

// Switch Colors

colorLi.forEach((li) => {
  li.addEventListener('click', function (e) {
    document.documentElement.style.setProperty(
      '--main-color',
      e.target.dataset.color,
    );
    handleActive(e);
    localStorage.setItem('--main-color', e.target.dataset.color);
  });
});

const randomBackEL = document.querySelectorAll('.random-backgrounds span');
let randBackground = localStorage.getItem('randBackground');
if (randBackground !== null) {
  randomBackEL.forEach((el) => el.classList.remove('active'));
  document
    .querySelector(`.random-backgrounds span.${randBackground}`)
    .classList.add('active');
}

randomBackEL.forEach((el) => {
  el.addEventListener('click', function (e) {
    handleActive(e);
    if (e.target.dataset.background == 'yes') {
      localStorage.setItem('randBackground', 'yes');
      backgroundOption = true;
      randomizeImgs();
    } else {
      localStorage.setItem('randBackground', 'no');
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector('.landing-page');
//Get Array Of Imgs
let imgsArray = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];

let backgroundOption =
  localStorage.getItem('randBackground') == 'no' ? false : true;
let backgroundInterval;

function randomizeImgs() {
  landingPage.style.backgroundImage = `url('imgs/${
    imgsArray[+localStorage.getItem('randNumber')] || '01.jpg'
  }')`;

  if (backgroundOption) {
    backgroundInterval = setInterval(function () {
      // Get Random Number
      let randNumber = Math.floor(Math.random() * imgsArray.length);
      localStorage.setItem('randNumber', randNumber);
      landingPage.style.backgroundImage = `url('imgs/${imgsArray[randNumber]}')`;
    }, 5000);
  }
}

randomizeImgs();

// Select Skills
let ourSkills = document.querySelector('.skills');

window.onscroll = function () {
  let trigger = true;

  if (trigger) {
    if (
      this.scrollY >=
      ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight
    ) {
      document
        .querySelectorAll('.skill-box .skill-progress span')
        .forEach((el) => (el.style.width = el.dataset.progress));
      trigger = false;
    }
  }
};

let ourGallery = document.querySelectorAll('.gallery img');

ourGallery.forEach((el) => {
  el.addEventListener('click', function () {
    let overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    let popupBox = document.createElement('div');
    popupBox.className = 'popup-box';
    if (el.alt !== null) {
      let imgHeading = document.createElement('h3');
      let imgText = document.createTextNode(el.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    let popupImage = document.createElement('img');
    popupImage.src = el.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement('span');
    let closeText = document.createTextNode('X');
    closeButton.appendChild(closeText);
    closeButton.className = 'close-button';
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener('click', function (e) {
  if (e.target.className == 'close-button') {
    e.target.parentNode.remove();
    document.querySelector('.popup-overlay').remove();
  }
});

let navBullets = document.querySelectorAll('.nav-bullets .bullets');
let links = document.querySelectorAll('.links a');

function scrollSection(elements) {
  elements.forEach((el) => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: 'smooth' });
    });
  });
}

scrollSection(navBullets);
scrollSection(links);

function handleActive(e) {
  e.target.parentElement.querySelectorAll('.active').forEach((el) => {
    el.classList.remove('active');
  });
  e.target.classList.add('active');
}

let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');
let bulletLocalItem = localStorage.getItem('bullets-option');

if (bulletLocalItem != null) {
  bulletsSpan.forEach((el) => {
    el.classList.remove('active');
  });

  if (bulletLocalItem == 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector('.bullets-option span.yes').classList.add('active');
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector('.bullets-option span.no').classList.add('active');
  }
}

bulletsSpan.forEach((el) => {
  el.addEventListener('click', function (e) {
    if (e.target.dataset.display == 'block') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem('bullets-option', 'block');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem('bullets-option', 'none');
    }

    handleActive(e);
  });
});

document.querySelector('.reset-option').onclick = function () {
  localStorage.clear();
  location.reload();
};

let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');
toggleBtn.onclick = function (e) {
  e.stopPropagation();
  tLinks.classList.toggle('open');
};

document.addEventListener('click', (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains('open')) tLinks.classList.remove('open');
  }
});

tLinks.onclick = function (e) {
  e.stopPropagation();
};
