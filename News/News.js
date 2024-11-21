const btnScrollToTop = document.querySelector("#btnScrollToTop");
const subMenu = document.querySelector("#subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}




btnScrollToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior:"smooth",
    });
});