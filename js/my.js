//AOS
AOS.init({
    duration: 1200
  });

  let toggleBtn = document.querySelector('.search_btn');
  let toggleMenu = document.querySelector('.search_popup');
  let closeBtn = document.querySelector('.close_bg');
  
  
  toggleBtn.addEventListener('click', () => {
      toggleMenu.classList.add('active')
  })
  closeBtn.addEventListener('click', () => {
      toggleMenu.classList.remove('active')
  }) 


// let path = window.location.href;
//     let liNk = document.querySelectorAll('.nav-link');

//     liNk.forEach((e) => {
//          console.log(e.href);
//         if (e.href === path) {
//             console.log(e.href);
//             e.classList.add('active');
// }
// })


 
     const openNavMenu = document.querySelector(".open-nav-menu"),
     closeNavMenu = document.querySelector(".close-nav-menu"),
     navMenu = document.querySelector(".nav-menu"),
     menuOverlay = document.querySelector(".menu-overlay"),
     mediaSize = 991;
   
     openNavMenu.addEventListener("click", toggleNav);
     closeNavMenu.addEventListener("click", toggleNav);
     // close the navMenu by clicking outside
     menuOverlay.addEventListener("click", toggleNav);
   
     function toggleNav() {
          navMenu.classList.toggle("open");
          menuOverlay.classList.toggle("active");
          document.body.classList.toggle("hidden-scrolling");
     }
   
     navMenu.addEventListener("click", (event) =>{
         if(event.target.hasAttribute("data-toggle") && 
              window.innerWidth <= mediaSize){
              // prevent default anchor click behavior
              event.preventDefault();
              const menuItemHasChildren = event.target.parentElement;
           // if menuItemHasChildren is already expanded, collapse it
           if(menuItemHasChildren.classList.contains("active")){
                collapseSubMenu();
           }
           else{
             // collapse existing expanded menuItemHasChildren
             if(navMenu.querySelector(".menu-item-has-children.active")){
                collapseSubMenu();
             }
             // expand new menuItemHasChildren
             menuItemHasChildren.classList.add("active");
             const subMenu = menuItemHasChildren.querySelector(".sub-menu");
             subMenu.style.maxHeight = subMenu.scrollHeight + "px";
           }
         }
     });
     function collapseSubMenu(){
          navMenu.querySelector(".menu-item-has-children.active .sub-menu")
          .removeAttribute("style");
          navMenu.querySelector(".menu-item-has-children.active")
          .classList.remove("active");
     }
     function resizeFix(){
           // if navMenu is open ,close it
           if(navMenu.classList.contains("open")){
                toggleNav();
           }
           // if menuItemHasChildren is expanded , collapse it
           if(navMenu.querySelector(".menu-item-has-children.active")){
                collapseSubMenu();
        }
     }
   
     window.addEventListener("resize", function(){
        if(this.innerWidth > mediaSize){
             resizeFix();
        }
     });
   


   

//    sticky header add 
let header = document.querySelector('.header');
window.addEventListener('scroll', function(){
    if(window.pageYOffset >= 200){
        header.classList.add("sticky_header")
    }
    else{
        header.classList.remove("sticky_header")
    }
})



$('.review_slider').owlCarousel({
     loop: true,
     margin: 20,
     dots: false,
     nav: true,
     mouseDrag: true,
     autoplay: true,
     autoplayHoverPause: true,
     autoplayTimeout: 4000,
     autoplaySpeed: 2000,
     navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
     responsive: {
          0: {
               items: 1
          },
          600: {
               items: 2
          },
          1000: {
               items: 3
          }
     }
});

$('.partner_slider').owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: false,
    mouseDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 2000,
    responsive: {
         0: {
              items: 2
         },
         600: {
              items: 2
         },
         1000: {
              items: 6
         }
    }
});




let selectContainer = document.querySelector(".select-container");
let select = document.querySelector(".select");
let input = document.getElementById("input");
let options = document.querySelectorAll(".select-container .option");

select.onclick = () => {
    selectContainer.classList.toggle("active");
};

options.forEach((e) => {
    e.addEventListener("click", () => {
        input.value = e.innerText;
        selectContainer.classList.remove("active");
        options.forEach((e) => {
            e.classList.remove("selected");
        });
        e.classList.add("selected");
    });
});

// ==========================================================



class Calendar {
     constructor(inputSelector) {
         this.input = document.querySelector(inputSelector);
         this.form = this.input.parentElement;
         this.popupContainer = null;
         this.monthContainer = null;
         this.tableContainer = null;
         this.table = document.createElement("table");
         this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         this.selectedMonth = new Date().getMonth();
         this.selectedYear = new Date().getFullYear();
         
         this.buildCalendar();
         this.setMainEventListener();
     }
     
     buildCalendar() {
         this.popupContainer = document.createElement("div");
         this.popupContainer.classList.add("calendar-popup");
         this.form.appendChild(this.popupContainer);
 
         
         this.monthContainer = document.createElement("div");
         this.monthContainer.classList.add("month-and-year");
         this.monthContainer.innerHTML = `<h4>${this.getMonth()} ${this.getYear()}</h4>`;
         this.popupContainer.appendChild(this.monthContainer);
 
         this.createButtons();
 
         this.populateTable(this.selectedMonth, this.selectedYear);
     }
 
     createButtons() {
         const prev = document.createElement("button");
         prev.classList.add('button', 'prev');
         prev.innerHTML = "<i class='fas fa-chevron-left'></i>";
         const next = document.createElement("button");
         next.classList.add('button', 'next');
         next.innerHTML = "<i class='fas fa-chevron-right'></i>";
 
         prev.addEventListener("click", e => {
             e.preventDefault();
             this.updateMonth(this.selectedMonth - 1);
         });
 
         next.addEventListener("click", e => {
             e.preventDefault();
             this.updateMonth(this.selectedMonth + 1);
         });
 
         this.popupContainer.appendChild(prev);
         this.popupContainer.appendChild(next);
     }
 
     populateTable(month, year) {
         this.table.innerHTML = "";
 
         const namesRow = document.createElement("tr");
         ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(name => {
             const th = document.createElement("th");
             th.innerHTML = name;
             namesRow.appendChild(th);
         });
         this.table.appendChild(namesRow);
 
         const tempDate = new Date(year, month, 1);
         let firstMonthDay = tempDate.getDay();
         firstMonthDay = firstMonthDay === 0 ? 7 : tempDate.getDay();
 
         const daysInMonth = this.getDaysInMonth(month, year);
         const j = daysInMonth + firstMonthDay - 1;
 
         let tr = document.createElement("tr");
 
         if (firstMonthDay-1 !== 0) {
             tr = document.createElement("tr");
             this.table.appendChild(tr);
         }
 
         for (let i=0; i<firstMonthDay-1; i++) {
             const td = document.createElement("td");
             td.innerHTML = "";
             tr.appendChild(td);
         }
 
         for (let i = firstMonthDay-1; i<j; i++) {
             if(i % 7 === 0){
                 tr = document.createElement("tr");
                 this.table.appendChild(tr);
             }
 
             const td = document.createElement("td");
             td.innerText = i - firstMonthDay + 2;
             td.dayNr = i - firstMonthDay + 2;
             td.classList.add("day");
 
             td.addEventListener("click", e => {
                 const selectedDay = e.target.innerHTML;
                 this.fillInput(selectedDay);
                 this.hideCalendar();
             });
 
             tr.appendChild(td);
         }
 
         this.popupContainer.appendChild(this.table);
     }
 
     fillInput(day) {
         day = day < 10 ? "0" + day : day;
         let month = null;
         month = this.selectedMonth < 9 ? "0" + (this.selectedMonth + 1) : this.selectedMonth + 1;
         this.input.value = `${day}.${month}.${this.selectedYear}`;
     }
 
     updateMonth(month) {
         this.selectedMonth = month;
         if (this.selectedMonth < 0) {
             this.selectedYear--;
             this.selectedMonth = 11;
         } else if (this.selectedMonth > 11) {
             this.selectedYear++;
             this.selectedMonth = 0;
         }
         this.monthContainer.innerHTML = `<h4>${this.months[this.selectedMonth]} ${this.selectedYear}</h4>`;
 
         this.populateTable(this.selectedMonth, this.selectedYear)
     }
     
     getMonth() {
         return this.months[this.selectedMonth];
     }
 
     getYear() {
         return this.selectedYear;
     }
 
     getDaysInMonth(month, year) {
         return new Date(year, month + 1, 0).getDate();
     }
     
     hideCalendar() {
         this.form.classList.remove("open");
     }
 
     setMainEventListener() {
         this.input.addEventListener("click", e => {
             this.form.classList.toggle("open");
             
             if(!this.form.classList.contains("open")) {
                 this.hideCalendar();
             }
         });
     }
 }
 
 new Calendar(".date-input");




//  =====================================
