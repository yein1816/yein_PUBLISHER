//메인 페이지 글자 타이핑
$(".split").each(function () {
  let text = $(this).text();
  let split = text.split("").join("<span aria-hidden='true'></span>");
  split = "<span aria-hidden='true'>" + split + "</span>";
});

setTimeout(function () {
  gsap.to(".split span", {
    duration: 0.5,
    opacity: 1,
    y: 0,
    stagger: 0.1,
  });
}, 100);


//스크롤 시 네비 하단 라인 및 글자 색상
$(window).scroll(function () {
  const scr = $(document).scrollTop();
  let all_t = $(document).height();
  let abo_t = $("#about").offset().top;
  let pro_t = $("#project").offset().top;
  let con_t = $("#contact").offset().top;

  //네비 글자 색상
  if (con_t > scr && scr >= abo_t) {
    //네비 글자색 #616161
    $("#header").addClass("color");
  } else {
    //네비 글자색 #fff
    $("#header").removeClass("color");
  }

  //네비 색상 변화
  if (scr < abo_t) {
    //home
    $(".gnb li").removeClass("on");
    $(".gnb #home_target").addClass("on");
  } else if (scr >= abo_t && scr < pro_t) {
    //about
    $(".gnb li").removeClass("on");
    $(".gnb #about_target").addClass("on");
  } else if (scr >= pro_t && scr < con_t) {
    //project
    $(".gnb li").removeClass("on");
    $(".gnb #project_target").addClass("on");
  } else if (scr >= con_t && scr < all_t) {
    //contact
    $(".gnb li").removeClass("on");
    $(".gnb #contact_target").addClass("on");
    if ($(window).width() > 991) {
      $("#contact .contentWrap").stop().animate({ left: 0, opacity: 1 }, 1200);
    } else {
    }
  }

  //가로 스크롤
  let offset = scr - pro_t;

  if (scr > pro_t) {
    $("#project .container").css({ left: -offset - 3900 });
  }
});

//메인 메뉴 클릭 시 해당 페이지로 자연스럽게 스크롤
$(".gnb li a").on("click", function () {
  let hr = $(this).attr("href");
  let target = $(hr).offset().top;

  $("html, body").animate({ scrollTop: target }, 800);
});

//top 버튼 클릭 시 페이지 상단으로 자연스럽게 스크롤
$("#top").click(function () {
  $("html, body").stop().animate({ scrollTop: 0 }, 800);
});

// 텍스트를 출력할 span 요소와 커서 요소를 가져옵니다.
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

// 출력할 텍스트 배열과 딜레이 설정들을 정의합니다.
const textArray = ["누구라도 보기 쉽게,", " 흥미를 느낄 수 있는,", " 웹사이트를 구축하고 싶습니다."];
const typingDelay = 200; // 타이핑 딜레이 (한 글자씩 출력하는 딜레이)
const erasingDelay = 100; // 지우기 딜레이 (한 글자씩 지우는 딜레이)
const newTextDelay = 2000; // 현재 텍스트와 다음 텍스트 사이의 딜레이 (타이핑이 끝나고 다음 텍스트가 나타나는 딜레이)

let textArrayIndex = 0; // 현재 텍스트 배열의 인덱스
let charIndex = 0; // 현재 타이핑 또는 지우기 중인 텍스트의 인덱스

// 타이핑 효과 함수
function type() {
  // 현재 타이핑 중인 텍스트의 인덱스가 해당 텍스트의 길이보다 작은 경우
  if (charIndex < textArray[textArrayIndex].length) {
    // 커서가 타이핑 중인 상태가 아니면 "typing" 클래스를 추가하여 깜빡임 효과를 적용합니다.
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    
    // 타이핑 중인 텍스트를 한 글자씩 출력합니다.
    typedTextSpan.textContent += textArray[textArrayIndex][charIndex];
    charIndex++; // 다음 글자 인덱스로 이동
    setTimeout(type, typingDelay); // 일정 딜레이 후 다음 글자 타이핑
  } else {
    // 타이핑이 완료된 경우 "typing" 클래스를 제거하여 커서 깜빡임 효과를 중지합니다.
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay); // newTextDelay 시간 후 지우기 효과 시작
  }
}

// 지우기 효과 함수
function erase() {
  // 현재 지우기 중인 텍스트의 인덱스가 0보다 큰 경우
  if (charIndex > 0) {
    // 커서가 타이핑 중인 상태가 아니면 "typing" 클래스를 추가하여 깜빡임 효과를 적용합니다.
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    
    // 타이핑 중인 텍스트를 한 글자씩 지웁니다.
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--; // 이전 글자 인덱스로 이동
    setTimeout(erase, erasingDelay); // 일정 딜레이 후 다음 글자 지우기
  } else {
    // 지우기가 완료된 경우 "typing" 클래스를 제거하여 커서 깜빡임 효과를 중지합니다.
    cursorSpan.classList.remove("typing");
    
    // 다음 텍스트 배열의 인덱스로 이동하고, 배열 범위를 벗어나면 다시 처음으로 돌아갑니다.
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    
    // 일정 딜레이 후 다음 타이핑 효과를 시작합니다.
    setTimeout(type, typingDelay + 900);
  }
}

// 페이지가 로드되면 (DOMContentLoaded 이벤트 발생 시), 텍스트 타이핑 효과를 시작합니다.
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, newTextDelay + 250);
});
