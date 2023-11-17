/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// const sections = document.querySelectorAll("section[id]");

// function scrollActive() {
//   const scrollY = window.pageYOffset;

//   sections.forEach((current) => {
//     const sectionHeight = current.offsetHeight,
//       sectionTop = current.offsetTop - 50,
//       sectionId = current.getAttribute("id");

//     if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//       document
//         .querySelector(".nav__menu a[href*=" + sectionId + "]")
//         .classList.add("active-link");
//     } else {
//       document
//         .querySelector(".nav__menu a[href*=" + sectionId + "]")
//         .classList.remove("active-link");
//     }
//   });
// }
// window.addEventListener("scroll", scrollActive);

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/* Hero type effect */
const typed = document.querySelector('.typed');
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(", ");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  });
}

// Dashboard Mode

const upBtn = document.getElementById('up-btn');
const capBtn = document.getElementById('cap-btn');
const liveBtn = document.getElementById('live-btn');
const upSec = document.getElementById("up-sec");
const capSec = document.getElementById('cap-sec');
const liveSec = document.getElementById('live-sec');

upBtn.addEventListener('click', function () {
  upSec.style.display = 'block';
  capSec.style.display = 'none';
  liveSec.style.display = 'none';

  upBtn.classList.add('active', 'teal');
  capBtn.classList.remove('active', 'teal');
  liveBtn.classList.remove('active', 'teal');
});

capBtn.addEventListener('click', function () {
  upSec.style.display = 'none';
  capSec.style.display = 'block';
  liveSec.style.display = 'none';

  upBtn.classList.remove('active', 'teal');
  capBtn.classList.add('active', 'teal');
  liveBtn.classList.remove('active', 'teal');
});

liveBtn.addEventListener('click', function () {
  upSec.style.display = 'none';
  capSec.style.display = 'none';
  liveSec.style.display = 'block';

  upBtn.classList.remove('active', 'teal');
  capBtn.classList.remove('active', 'teal');
  liveBtn.classList.add('active', 'teal');
});