const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;

    if (window.pageYOffset - height > 800) {
        if (!headerEl.classList.contains("sticky")) {
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky");
    }

    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none";
    }
});

const glide = new Glide(".glide");
const captionsEL = document.querySelectorAll(".slide-caption");
glide.on(["mount.after", "run.after"], () => {
    const caption = captionsEL[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: "linear", //动画执行函数，线性的
        delay: anime.stagger(400, {
            start: 300
        }), //重点！对caption的每一个child都会轮流加上括号内参数。start为h1出现之前先等待300ms
        translateY: [anime.stagger([40, 10]), 0] //h1从下方40处移动，h3从下方40和10之间的数值移动，按钮从下方10px处移动
    });
});

//每一次轮播时将标题置为透明，这样每次轮播都会有动画
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount();

const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
    let {
        target
    } = e;
    const filterOption = target.getAttribute("data-filter");
    if (filterOption) {
        document
            .querySelectorAll(".filter-btn.active")
            .forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({
            filter: filterOption
        });
    }
});

const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

ScrollReveal().reveal(".feature", {
    ...staggeringOption,
    interval: 350
});
ScrollReveal().reveal(".service-item", {
    ...staggeringOption,
    interval: 350
});

const dataSectionEl = document.querySelector(".data-section");
// 数据增长
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration: 2000,
            round: 1,
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPositon = `center calc(50% - ${dataSectionEl.getBoundingClientRect()
      .bottom / 5}px)`;
    }
});

window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;  

    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPositon = `center calc(50% - ${bottom /
      5}px)`;
    }
});

// 流畅滚动
const scroll = new SmoothScroll('nav a[href*="#"],.scrollToTop a[href*="#"]',{
    header: "header",
    offset: 80,
});

const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach(exploreBtnEl=>{
    exploreBtnEl.addEventListener("click",()=>{
        scroll.animateScroll(document.querySelector("#about-us"));
    })
})
