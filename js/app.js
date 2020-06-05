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
const sections = document.querySelectorAll("section");
const navbarList = document.querySelector("#navbar__list");
const fragment = document.createDocumentFragment();
const content = document.querySelector("#main_content");
const toTop = document.querySelector(".icon");
const userScroll = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


function populateNavebar() {
    let c  = 1;

    for (let section of sections) { 

        const li = document.createElement("li");
        li.innerHTML  = `<a href ="#section${c}"> ${section.dataset.nav}</a>`;
        c += 1

        fragment.appendChild(li);

    };
    navbarList.appendChild(fragment);

};







/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// the function used to hen hover in seection it will be hieglighted
function active(evt){
    // remove active class from previous element
    for (let section of sections) { 
        section.classList.remove("your-active-class");

    };
    evt.target.offsetParent.classList.add("your-active-class");
};


function goToTop(){
    window.scrollTo(0,0)
    navbarList.style.display = "block";
};


function hidenav(){
    if (window.scrollY > 300  && userScroll == false ){
        navbarList.style.display = "none";
    };
};

function showNav(evt){
    const userScroll = true;
    let activeSection = "";
    let activeElement = "";

    if(window.scrollY > 300  && userScroll){
        navbarList.style.display = "block";
    };
    
    for (let section of sections){
        if (section.offsetTop + 200 > window.scrollY){
            activeSection = section.id;
            activeElement = section;
            break;
        };
    };

    //remove active class from all
    for (let li of navbarList.children) {
        li.children[0].classList.remove("active")
    };

    // remove your-active-class from all section 
    for (let section of sections) { 
        section.classList.remove("your-active-class");

    };
    // add active class to active section when scrolling
    for (let li of navbarList.children) {
        if (activeSection == li.children[0].hash.slice(1)){
            li.children[0].classList.add("active");
            activeElement.classList.add("your-active-class");

        };

    };
    setTimeout(hidenav , 30000);
};


function scrollToSection(evt){
    event.preventDefault();
    if (evt.target.nodeName == "A"){
        // li.children[0].hash.slice(1)
        let goTo = document.getElementById(evt.target.hash.slice(1));
        goTo.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    console.log(evt.target.hash)
    };
};

// build the nav
populateNavebar();

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
toTop.addEventListener("click" , goToTop)

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
navbarList.addEventListener("click" , scrollToSection)
// Set sections as active
content.addEventListener("mouseover" , active)
document.addEventListener("scroll" , showNav)


