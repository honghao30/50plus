
// 모달 레이어
function modalControl(type,id,size){ //type:열기(o),닫기(c) / id: 열 모달의 id / size: 모달 가로 사이즈
    var $html = $("html");
    if(type == "o"){ //모달 열기
      $html.addClass("modal-open");//모달오픈 시 뒤의 스크롤이 움직이는 것을 방지
      $(".modal_new").not(id).removeClass("modal_on");
      var $modalOn = $(id).addClass("modal_on").on("click", function(e){
        if( $modalOn.hasClass("modal_overlay") && $(".modal_n_wrap").is(e.target) ){ //오버레이 클릭 시 닫기
          $modalOn.removeClass("modal_on");
          $html.removeClass("modal-open");
        }
      });
    } else if(type == "c"){ //모달 닫기
      $(".modal_new.modal_on").removeClass("modal_on");
      $html.removeClass("modal-open");
      // userInfoPop 모달창이 열리기 전에
    }
}

// 탭
$(document).ready(function () {
  $('.tab_wrap').each(function () {
    const $tabWrap = $(this);
    
    $tabWrap.find('.tab-menu li').on('click', function (e) {
      e.preventDefault();

      const index = $(this).index();

      // 현재 tab_wrap 내에서만 처리
      $tabWrap.find('.tab-menu li').removeClass('active');
      $(this).addClass('active');

      $tabWrap.find('.tab-content .tab').removeClass('active');
      $tabWrap.find('.tab-content .tab').eq(index).addClass('active');
    });
  });
});


// 설문조사 상세 아코디언
$(document).ready(function () {
    // 페이지 로딩 시: .on이 붙은 아코디언은 열려 있게
    $(".accordion").each(function () {
      if ($(this).hasClass("on")) {
        $(this).find(".accordion-detail").show();
      } else {
        $(this).find(".accordion-detail").hide();
      }
    });

    // 버튼 클릭 시 처리
    $(".accordion > button").on("click", function () {
      const $accordion = $(this).parent();

      // 상태가 'on'이면 닫기
      if ($accordion.hasClass("on")) {
        $accordion.removeClass("on");
        $accordion.find(".accordion-detail").slideUp(200);
      } 
      // 상태가 'off'면 열기
      else {
        $accordion.addClass("on");
        $accordion.find(".accordion-detail").slideDown(200);
      }
    });
  });