/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const pageHeader = document.querySelector('.page__header');
const navUl = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const toTopButton = document.getElementById('toTop');
let t = null;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Add class 'active' to elemnt and remove it from it's siblings
function toggleActiveClass(el) {
    el.parentElement.querySelector('.active').classList.remove('active');
    el.classList.toggle("active");
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the navigation bar and add 'active' class to first item 
function buildNavbar() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < sections.length; i++) {
        const liEle = document.createElement("li");
        const aTag = document.createElement("a");
        aTag.classList.add("menu__link");
        aTag.textContent = sections[i].dataset.nav;
        aTag.href = "#section" + (i + 1);
        liEle.appendChild(aTag);
        fragment.appendChild(liEle);
        if (i === 0) {
            liEle.classList.add('active');
        }
    }
    navUl.appendChild(fragment);
}


// Add class 'active' to section when near top of viewport 
// Hide fixed navigation bar while not scrolling
// hide/show scroll to top button
function handleScroll() {
    const pageY = this.pageYOffset;
    const windowHeight = this.innerHeight;
    // Add class 'active' to section when near top of viewport 
    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const pos = section.getBoundingClientRect();
        if (pageY > (sectionTop + sectionHeight - windowHeight)) {
            toggleActiveClass(section);
            // Add an active state to navigation items when a section is in the viewport.
            const navLink = navUl.querySelector('a[href="#' + section.id +'"]');
            if (navLink != null) {
                toggleActiveClass(navLink.parentElement);
            }
        }    
    });
    // Hide fixed navigation bar while not scrolling
    pageHeader.style.top = '0';
    if (t !== null) {
        clearTimeout(t);
    }
    t = setTimeout(function () {
        pageHeader.style.top = "-50px";
    }, 4000);
    // hide/show scroll to top button
    if (pageY > 0) {
        toTopButton.style.display = 'block';
    } else {
        toTopButton.style.display = 'none';
    }
}

// Scroll to anchor and add active class to menu list item
function goToElement(e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    if (id != null) {
        toggleActiveClass(e.target.parentElement);
        window.scrollTo({
            top : document.querySelector(id).offsetTop,
            behavior : 'smooth'
        });
    }
}

// scroll to top button
function scrollToTop() {
    window.scrollTo({
        top : 0,
        behavior : 'smooth'
    });
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('load', buildNavbar);

// Set sections as active
window.addEventListener('scroll', handleScroll);

// Scroll to section on link click
navUl.addEventListener('click', goToElement);

// scroll to top button
toTopButton.addEventListener('click', scrollToTop);