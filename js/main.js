$(document).ready(function () {
  let $btns = $(".project-area .button-group button");

  // projects filter function
  $btns.click(function (e) {
    $(".project-area .button-group button").removeClass("active");
    e.target.classList.add("active");
    let selector = $(e.target).attr("data-filter");
    $(".project-area .grid").isotope({ filter: selector });
    return false;
  });
  $(".project-area .button-group #btn1").trigger("click");

  // sticky nav menu
  // let nav_offset_top = $(".header_area").height() + 50;

  // function navBarFixed() {
  //   if ($(".header_area").length) {
  //     $(window).scroll(function () {
  //       let scroll = $(window).scrollTop();
  //       if (scroll >= nav_offset_top) {
  //         $(".header_area .main-menu").addClass("navbar_fixed");
  //       } else {
  //         $(".header_area .main-menu").removeClass("navbar_fixed");
  //       }
  //     });
  //   }
  // }

  // navBarFixed();
});

// navbar highlight feature
const sections = document.querySelectorAll("section");
const navs = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset > sectionTop) {
      current = section.getAttribute("class");
    }
  });

  navs.forEach((li) => {
    console.log(li.classList);
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
});
