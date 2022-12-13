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
 
//user////////
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/dsNguoidung",
        success: function (response) {
            $('#table_user').html(response.map(function(item){
                return `<tr class="table_row">
                <td class="table_col user_info" id="${item.Ten_Dang_nhap}">${item.Ten_Dang_nhap}</td>
                <td class="table_col">${item.Mat_khau}</td>
                <td class="table_col">
                  <i
                    class="fas fa-share-alt col_icon btn_open_modal_proccess"
                    id="btn_open_modal_proccess_${item.Ten_Dang_nhap}" data='${JSON.stringify(item)}'
                  ></i>
                </td>
                <td class="table_col">
                  <i
                    class="fas fa-remove col_icon btn_open_remove_dinalog"
                    id="btn_open_remove_dinalog_${item.Ten_Dang_nhap}"
                    data = "${item.Ma_so}"
                  ></i>
                </td>
              </tr>`
            }));
            $('.user_info').each(function (index, element) {
                $(element).click(function (e) { 
                    e.preventDefault();
                    $('#user_info_modal').css({'display':'block'});
                    $('.info_heading').text($(element).attr('id'));
                });                
            });
            $('.btn_open_remove_dinalog').each(function (index, element) {
                $(element).click(function (e) { 
                    e.preventDefault();
                    $('.dinalog_remove').css('display','block');
                    $('#apply_remove_user').attr('data', $(element).attr('data'));
                });
            });
           
            $('#apply_remove_user').click(function (e) { 
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/XoaNguoidung",
                    data: JSON.stringify($(this).attr('data')),
                    dataType: 'json',
                    success: function (response) {
                        console.log(response)
                        $('.dinalog_remove').css('display','none');
                    }
                });
            });

            ///update
            $('#btn_exit_update_user').click(function (e) { 
                e.preventDefault();
                $('#user_proccess_modal').css('display','none');
            });
            $('.btn_open_modal_proccess').each(function (index, element) {
                $(element).click(function (e) { 
                    e.preventDefault();
                    var user = JSON.parse($(element).attr('data'))
                    $('#user_proccess_modal').css('display','block');
                    $('.proccess_heading').text(user.Ten_Dang_nhap);
                    $('#proccess_user_username').val(user.Ten_Dang_nhap);
                    $('#proccess_user_password').val(user.Mat_khau);
                    $('#btn_update_user').attr('data',user.Ma_so);
                });
            });
            $('#btn_update_user').click(function (e) { 
                e.preventDefault();
                var user = {
                    Ma_so: $(this).attr('data'),
                    Ten_Dang_nhap: $('#proccess_user_username').val(),
                    Mat_khau: $('#proccess_user_password').val(),
                }
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/SuaNguoidung",
                    data: JSON.stringify(user),
                    dataType: "json",
                    success: function (response) {
                        console.log(response)
                        $('#user_proccess_modal').css('display','none');
                    }
                });
            });
        }
    });
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
                Ma_so: register_email,
                isAdmin: $('#admin_add_user_isadmin').is(':checked'),
              }
              console.log(user_register) 
              $.ajax({
                type: "POST",
                url: "http://localhost:8080/ThemNguoidung",
                data: JSON.stringify(user_register),
                dataType: 'json',
                success: function (response) {
                  console.log(response)
                  $(".add_user_nofication").html(
                    "Register successfully !"
                  );
                }
              });
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

////profile info

$(document).ready(function () {
    console.log(sessionStorage.getItem('user'))
    var admin = JSON.parse(sessionStorage.getItem('user'))
    console.log(admin.Ten_Dang_nhap)
    $('.profile_info').text(admin.Ten_Dang_nhap);
    $('.admin_logout').click(function (e) { 
        e.preventDefault();
        sessionStorage.clear();
        document.location.href = "http://127.0.0.1:5500/pato-master/index.html"
    });
    $('#admin_profile_username').text(admin.Ten_Dang_nhap);
    $('#admin_profile_email').text(admin.Ten_Dang_nhap);
    $('#username').val(admin.Ten_Dang_nhap);
    $('#password').val(admin.Mat_khau);
    $('#name').val(admin.Ten)
    $('#phone').val(admin.Sdt)
    $('.btn_profile_update').click(function (e) { 
        e.preventDefault();
        var user = {
            Ma_so: admin.Ma_so,
            Ten_Dang_nhap: $('#username').val(),
            Mat_khau: $('#password').val(),
            Ten: $('#name').val(),
            Sdt: $('#phone').val()
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
            }
        });
    });
});