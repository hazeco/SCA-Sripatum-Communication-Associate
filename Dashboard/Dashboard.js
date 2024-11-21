const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

//รับจำนวนการ์ดที่สามารถใส่ในแครูเซลได้ในครั้งเดียว
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

//การนำการ์ดใบสุดท้ายกลับไปไว้ที่จุดเริ่มต้นของแถบเลื่อนเพื่อเลื่อนได้ไม่สิ้นสุด
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

//การเพิ่มการ์ดที่เหมือนกับการ์ดแรกๆ ไว้ที่ตอนท้าย ทำให้สามารถเลื่อนวนไปวนมาได้ไม่หยุด.
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

//ฟังก์ชันคลิกปุ่ม เมื่อคลิกแล้วจะทำให้แครูเซลเลื่อนไปทางซ้ายหรือขวาตามที่ต้องการ.
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? - firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    //บันทึกตำแหน่งของเมาส์และตำแหน่งการเลื่อนเริ่มต้นของแครูเซล
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; //ถ้าไม่กำลังลาก (isDragging เป็น false) ก็จะไม่ทำงานต่อไป และถ้ากำลังลากอยู่ จะอัพเดตตำแหน่งการเลื่อนของแครูเซลตามการเคลื่อนไหวของเมาส์.
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; //ถ้าหน้าจอเล็กกว่าขนาด 800 พิกเซล ให้หยุดทำงานตรงนี้ไปเลย ให้แครูเซลเล่นอัตโนมัติทุกๆ 2500 มิลลิวินาที
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

const InfiniteScroll = () => {
    
//ถ้าแครูเซลแสดงที่ตำแหน่งเริ่มต้นอยู่แล้วก็ให้เลื่อนกลับไปที่จุดเริ่มต้นของแครูเซลอีกครั้ง.
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }

    //ถ้าแครูเซลแสดงอยู่ที่ตำแหน่งสุดท้ายแล้ว ให้เลื่อนแครูเซลไปที่จุดสุดท้ายของแครูเซลอีกครั้ง.
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    //ถ้าเมาส์ไม่ได้อยู่บนแครูเซล ระบบจะลบการตั้งเวลาหรือการหยุดที่เคยมี และเริ่มให้แครูเซลเล่นอัตโนมัติอีกครั้ง.
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", InfiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


const btnScrollToTop = document.querySelector("#btnScrollToTop");

btnScrollToTop.addEventListener("click", function () {
    // window.scrollTo(0, 0);
    window.scrollTo({
        top: 0,
        behavior:"smooth",
    });
});

const subMenu = document.querySelector("#subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}