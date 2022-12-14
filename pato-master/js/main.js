(function ($) {
  "use strict";

  /*[ Load page ]
    ===========================================================*/
  $(".animsition").animsition({
    inClass: "fade-in",
    outClass: "fade-out",
    inDuration: 1500,
    outDuration: 800,
    linkElement: ".animsition-link",
    loading: true,
    loadingParentElement: "html",
    loadingClass: "animsition-loading-1",
    loadingInner: '<div class="cp-spinner cp-meter"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ["animation-duration", "-webkit-animation-duration"],
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "html",
    transition: function (url) {
      window.location.href = url;
    },
  });

  /*[ Back to top ]
    ===========================================================*/
  var windowH = $(window).height() / 2;

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > windowH) {
      $("#myBtn").css("display", "flex");
    } else {
      $("#myBtn").css("display", "none");
    }
  });

  $("#myBtn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
  });

  /*[ Select ]
    ===========================================================*/
  $(".selection-1").select2({
    minimumResultsForSearch: 20,
    dropdownParent: $("#dropDownSelect1"),
  });

  /*[ Daterangepicker ]
    ===========================================================*/
  $(".my-calendar").daterangepicker({
    singleDatePicker: true,
    showDropdowns: true,
    locale: {
      format: "DD/MM/YYYY",
    },
  });

  var myCalendar = $(".my-calendar");
  var isClick = 0;

  $(window).on("click", function () {
    isClick = 0;
  });

  $(myCalendar).on("apply.daterangepicker", function () {
    isClick = 0;
  });

  $(".btn-calendar").on("click", function (e) {
    e.stopPropagation();

    if (isClick == 1) isClick = 0;
    else if (isClick == 0) isClick = 1;

    if (isClick == 1) {
      myCalendar.focus();
    }
  });

  $(myCalendar).on("click", function (e) {
    e.stopPropagation();
    isClick = 1;
  });

  $(".daterangepicker").on("click", function (e) {
    e.stopPropagation();
  });

  /*[ Play video 01]
    ===========================================================*/
  var srcOld = $(".video-mo-01").children("iframe").attr("src");

  $('[data-target="#modal-video-01"]').on("click", function () {
    $(".video-mo-01").children("iframe")[0].src += "&autoplay=1";

    setTimeout(function () {
      $(".video-mo-01").css("opacity", "1");
    }, 300);
  });

  $('[data-dismiss="modal"]').on("click", function () {
    $(".video-mo-01").children("iframe")[0].src = srcOld;
    $(".video-mo-01").css("opacity", "0");
  });

  /*[ Fixed Header ]
    ===========================================================*/
  var header = $("header");
  var logo = $(header).find(".logo img");
  var linkLogo1 = $(logo).attr("src");
  var linkLogo2 = $(logo).data("logofixed");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 5 && $(this).width() > 992) {
      $(logo).attr("src", linkLogo2);
      $(header).addClass("header-fixed");
      $('.user_profile_icon').css('color','#000');
    } else {
      $(header).removeClass("header-fixed");
      $(logo).attr("src", linkLogo1);
      $('.user_profile_icon').css('color','#fff');
    }
  });

  /*[ Show/hide sidebar ]
    ===========================================================*/
  $("body").append('<div class="overlay-sidebar trans-0-4"></div>');
  var ovlSideBar = $(".overlay-sidebar");
  var btnShowSidebar = $(".btn-show-sidebar");
  var btnHideSidebar = $(".btn-hide-sidebar");
  var sidebar = $(".sidebar");

  $(btnShowSidebar).on("click", function () {
    $(sidebar).addClass("show-sidebar");
    $(ovlSideBar).addClass("show-overlay-sidebar");
  });

  $(btnHideSidebar).on("click", function () {
    $(sidebar).removeClass("show-sidebar");
    $(ovlSideBar).removeClass("show-overlay-sidebar");
  });

  $(ovlSideBar).on("click", function () {
    $(sidebar).removeClass("show-sidebar");
    $(ovlSideBar).removeClass("show-overlay-sidebar");
  });

  /*[ Isotope ]
    ===========================================================*/
  var $topeContainer = $(".isotope-grid");
  var $filter = $(".filter-tope-group");

  // filter items on button click
  $filter.each(function () {
    $filter.on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $topeContainer.isotope({ filter: filterValue });
    });
  });

  // init Isotope
  $(window).on("load", function () {
    var $grid = $topeContainer.each(function () {
      $(this).isotope({
        itemSelector: ".isotope-item",
        percentPosition: true,
        animationEngine: "best-available",
        masonry: {
          columnWidth: ".isotope-item",
        },
      });
    });
  });

  var labelGallerys = $(".label-gallery");

  $(labelGallerys).each(function () {
    $(this).on("click", function () {
      for (var i = 0; i < labelGallerys.length; i++) {
        $(labelGallerys[i]).removeClass("is-actived");
      }
      $(this).addClass("is-actived");
    });
  });

  //handle button login to sigup and back
  $("#btn_tosignup").on("click", function () {
    $("#loginbody").css("display", "none");
    $("#registerbody").css("display", "block");
  });
  $("#btn_tologin").on("click", function () {
    $("#registerbody").css("display", "none");
    $("#loginbody").css("display", "block");
  });
  //==============================================
})(jQuery);

// dang nhap dang ky show from
// $(document).ready(function () {
//   $("#loginModal").modal("show");
//   $(function () {
//     $('[data-toggle="tooltip"]').tooltip();
//   });
// });
//show profile modal

$(document).ready(function () {
  $("#btn_open_profile_modal").click(function (e) {
    e.preventDefault();
    $(".profile_modal").css("display", "flex");
  });
  $("#btn_close_profile_modal").click(function (e) {
    e.preventDefault();
    $(".profile_modal").css("display", "none");
  });
});

//register_post

$(document).ready(function () {
  var register_password = "";
  var pre_register_password = "";
  var register_email = "";
  $("#email_register").change(function (e) {
    e.preventDefault();
    register_email = $(this).val();
  });
  $("#password_register").change(function (e) {
    e.preventDefault();
    register_password = $(this).val();
  });
  $("#pre_password_register").change(function (e) {
    e.preventDefault();
    pre_register_password = $(this).val();
  });
  $("#btn_register_submit").click(function (e) {
    e.preventDefault();
    if (
      register_password === "" ||
      pre_register_password === "" ||
      register_email === ""
    ) {
      $(".register_nofication").html(
        "Email, password, and password reentry must not be blank !"
      );
      $(".register_nofication").css({
        color: "var(--primary_red)",
      });
    } else if (register_password !== pre_register_password) {
      $(".register_nofication").html(
        "Password and password reentry not match !"
      );
      $(".register_nofication").css({
        color: "var(--primary_red)",
      });
    }
    else{
        ////ban cai action + payload api /// them hieu ung 
        var user_register ={
          Ten_Dang_nhap: register_email,
          Mat_khau: register_password,
          Ma_so: register_email,
          isAdmin: false,
        }
        $.ajax({
          type: "POST",
          url: "http://localhost:8080/ThemNguoidung",
          data: JSON.stringify(user_register),
          dataType: 'json',
          success: function (response) {
            console.log(response)
            $(".register_nofication").html(
              "Register successfully !"
            );
          }
        });
        ///---------------------
        $(".register_nofication").html(
          "Loading..."
        );
        $(".register_nofication").css({
            color: "var(--primary_cryan_hover)",
        });
      }
  });
});

//login post

$(document).ready(function () {
    var email_login = '';
    var password_login = '';
    $('#email_login').change(function (e) { 
        e.preventDefault();
        email_login = $(this).val();
    });
    $('#password_login').change(function (e) { 
        e.preventDefault();
        password_login = $(this).val();
    });
    $('.profile_modal').click(function (e) { 
        $(this).css('display','none');
    });
    $('.profile_user_content').click(function (e) { 
        e.stopPropagation();
    });
    $('#btn_login_submit').click(function (e) { 
        e.preventDefault();
        if (
          password_login === "" ||
          email_login === ""
        ) {
          $(".login_nofication").html(
            "Email, password must not be blank !"
          );
          $(".login_nofication").css({
            color: "var(--primary_red)",
          });
        }
        else{
          $(".login_nofication").html(
            "Loading..."
          );
          $(".login_nofication").css({
            color: "var(--primary_cryan_hover)",
          });
          $.ajax({
            type: "GET",
            url: "http://localhost:8080/dsNguoidung",
            success: function (response) {
              console.log(response);
              var user = response.filter(function(item){
                return item.Ten_Dang_nhap === email_login && item.Mat_khau === password_login
              })[0]
              if(user){
                $(".login_nofication").html(
                  "Login Successfully !"
                );
                $(".login_nofication").css({
                  color: "var(--primary_cryan_hover)",
                });
                sessionStorage.setItem('isLogin',true)
                sessionStorage.setItem('user',JSON.stringify(user))
                if(user.isAdmin == true){
      
                  document.location.href = 'http://127.0.0.1:5500/pato-master/admin.html'
                }else{

                  document.location.href = 'http://127.0.0.1:5500/pato-master/index.html'
                }
              }else{
                $(".login_nofication").html(
                  "Login fail !"
                );
                $(".login_nofication").css({
                  color: "var(--primary_red)",
                });
              }
            }
          });
        }
    });
});


/// control user loing log out
$(document).ready(function () {
  if(sessionStorage.getItem('isLogin')){
    $('.user_control').css('display','block');
    $('#login_icon').css('display','none');
  }
  $('#log_out').click(function (e) { 
    e.preventDefault();
    sessionStorage.clear('isLogin')
    sessionStorage.clear('user')
    document.location.href = 'http://127.0.0.1:5500/pato-master/index.html'
  });
});

////user settting + profile
$(document).ready(function () {
  function pushInfoProfile(user){
    $('#heading_profile_user').text(user.Ten_Dang_nhap);
    $('#email_profile_user').text(user.Ten_Dang_nhap);
    $('#username_user_profile').val(user.Ten_Dang_nhap);
    $('#password_profile_user').val(user.Mat_khau);
    $('#phone_profile_user').val(user.Sdt);
    $('#name_profile_user').val(user.Ten);
  }
  var userprofile = JSON.parse(sessionStorage.getItem('user'))
  $('.user_setting_heading').html(userprofile.Ten_Dang_nhap);
  pushInfoProfile(userprofile)
  $('#btn_update_profile_user').click(function (e) { 
    e.preventDefault();
    var user = {
      Ma_so: userprofile.Ma_so,
      Ten_Dang_nhap: $('#username_user_profile').val(),
      Mat_khau: $('#password_profile_user').val(),
      Ten: $('#name_profile_user').val(),
      Sdt: $('#phone_profile_user').val()
      }
      $.ajax({
          type: "POST",
          url: "http://localhost:8080/SuaNguoidung",
          data: JSON.stringify(user),
          dataType: "json",
          success: function (response) {
              console.log(response)
              sessionStorage.setItem('user',JSON.stringify(user))
              console.log(sessionStorage.getItem('user'))
              pushInfoProfile(user)
              $('#update_profile_nofication').text('Update Successfully !!');
              setTimeout(() => {
                $('#update_profile_nofication').text('');
              }, 700);
          }
      });
  });
});
