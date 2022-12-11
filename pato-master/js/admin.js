$(document).ready(function () {
    var id_active = 'item_user'
    var id_content = 'item_user_content'
    $(`ul li[id = '${id_active}']`).addClass('item_active');
    $('.container_content').each(function (index, element) {
        $(this).attr('id') === id_content ? $(this).css('display','block') : $(this).css('display','none')
    });
    $('.menu_list_item').click(function (e) { 
        e.preventDefault();

        id_active = $(this).attr('id')
        id_content = `${$(this).attr('id')}_content`

        $('.menu_list_item').each(function (index, element) {
            $(this).attr('id') === id_active ? $(this).addClass('item_active'): $(this).removeClass('item_active');
        });
        $('.container_content').each(function (index, element) {
            $(this).attr('id') === id_content ? $(this).css('display','block') : $(this).css('display','none')
        });
    });
    $("#user_info").click(function (e) { 
        e.preventDefault();
        $('#user_info_modal').css({'display':'block'});
    });
    $('.info_close_icon').click(function (e) { 
        e.preventDefault();
        $('#user_info_modal').css({'display':'none'});
        $('#order_info_modal').css('display','none');
    });
    $('#btn_open_modal_proccess').click(function (e) { 
        e.preventDefault();
        $('#user_proccess_modal').css('display','block');
    });
    $('.btn_open_remove_dinalog').click(function (e) { 
        e.preventDefault();
        $('.dinalog_remove').css('display','block');
    });
    $('.cancel_dinalog').click(function (e) { 
        e.preventDefault();
        $('.dinalog_remove').css({'display':'none'});
    });
    $('#btn_open_modal_order_info').click(function (e) { 
        e.preventDefault();
        $('#order_info_modal').css(
            'display','block'
        );
    });
    $('.cancel_proccess').click(function (e) { 
        e.preventDefault();
        $('#gallery_proccess_modal').css('display','none');
        $('#gallery_new_modal').css('display','none');
        $('#blog_proccess_modal').css('display','none');
        $('#blog_new_modal').css('display','none');
    });
    $('#btn_open_modal_proccess_gallery').click(function (e) { 
        e.preventDefault();
        $('#gallery_proccess_modal').css('display','block');
    });
    $('#btn_new_gallery').click(function (e) { 
        e.preventDefault();
        $('#gallery_new_modal').css('display','block');
    });
    $('#btn_new_blog').click(function (e) { 
        e.preventDefault();
        $('#blog_new_modal').css('display','block');
    });
    $('#btn_open_modal_proccess_blog').click(function (e) { 
        e.preventDefault();
        $('#blog_proccess_modal').css('display','block');
    });

});


$(document).ready(function () {
    $('.btn_add_user').click(function (e) { 
        e.preventDefault();
        var register_password = $('#admin_add_user_password').val();
        var pre_register_password = $('#admin_add_user_prepassword').val();
        var register_email = $('#admin_add_user_email').val();
        if (
            register_password === "" ||
            pre_register_password === "" ||
            register_email === ""
          ) {
            $(".add_user_nofication").html(
              "Email, password, and password reentry must not be blank !"
            );
            $(".add_user_nofication").css({
              color: "var(--primary_red)",
            });
          } else if (register_password !== pre_register_password) {
            $(".add_user_nofication").html(
              "Password and password reentry not match !"
            );
            $(".add_user_nofication").css({
              color: "var(--primary_red)",
            });
          }
          else{
              ////ban cai action + payload api /// them hieu ung 
              var user_register ={
                Ten_Dang_nhap: register_email,
                Mat_khau: register_password,
                isAdmin: $('#admin_add_user_isadmin').is(':checked'),
              }
              console.log(user_register) 
            //   $.ajax({
            //     type: "POST",
            //     url: "http://localhost:8080/ThemNguoidung",
            //     data: JSON.stringify(user_register),
            //     dataType: 'json',
            //     success: function (response) {
            //       console.log(response)
            //       $(".add_user_nofication").html(
            //         "Register successfully !"
            //       );
            //     }
            //   });
              ///---------------------
              $(".add_user_nofication").html(
                "Loading..."
              );
              $(".add_user_nofication").css({
                  color: "var(--primary_cryan_hover)",
              });
            }
    });
});