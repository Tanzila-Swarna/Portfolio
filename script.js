window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 600);

});

const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.classList.remove("fa-moon");
        themeBtn.classList.add("fa-sun");

    }

    else{

        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");

    }

});

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("show");

});

navLinks.querySelectorAll("a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("show");

    });

});

function openModal(id){

    document.getElementById(id).style.display="block";

}

function closeModal(id){

    document.getElementById(id).style.display="none";

}

window.onclick=function(e){

    const modals=document.querySelectorAll(".modal");

    modals.forEach(modal=>{

        if(e.target===modal){

            modal.style.display="none";

        }

    });

};

const form=document.getElementById("contact-form");

form.addEventListener("submit",function(e){

    e.preventDefault();

    alert("Thank you for your message! I will get back to you soon.");

    form.reset();

});

const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-150;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navItems.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});
const observer=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(".section").forEach(sec=>{

    sec.classList.add("hidden");

    observer.observe(sec);

});

const topBtn=document.createElement("button");

topBtn.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="25px";
topBtn.style.right="25px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#8B5CF6";
topBtn.style.color="#fff";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.fontSize="18px";
topBtn.style.boxShadow="0 10px 25px rgba(0,0,0,.2)";
topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

const tagline = document.querySelector(".hero-tagline");

const roles = [
    "Turning Ideas Into Reality",
    "Software Engineering Student",
    "Frontend Developer",
    "IoT Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < roles[roleIndex].length) {
        tagline.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        tagline.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();
