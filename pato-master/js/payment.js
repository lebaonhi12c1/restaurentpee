$(document).ready(function () {
    var order = JSON.parse(sessionStorage.getItem('order'))
    console.log(order)
    $('#pay_foods').html(order.arrayFood.map(function(item){
        return `<div class="d-flex pt-2">
        <div>
          <p>
            <b
              >${item.Ten}
              <span class="text-success ml-2">${item.Don_gia_Ban}</span></b
            >
          </p>
        </div>

      </div>
      <div
        class="rounded d-flex"
        style="background-color: #f8f9fa"
      >
        <div class="p-2">x 1</div>
      </div>
      <hr />`
    }));
    $('#pay_date').text(order.date);
    $('#pay_food_list').text(order.arrayFood.length !==0 ? order.arrayFood.map(function(item){
      return item.Ten
  }): 'None')
    $('#pay_food_quality').text("x"+order.arrayFood.length);
    $('#pay_total').text(500000 + (order.arrayFood.length !==0 ? order.arrayFood.reduce(function(total,item){
        return total + Number(item.Don_gia_Ban)
    },0): 0))
    $('#pay_order').text(Number($('#pay_total').text())*0.6);
    $('#pay_total_price').text(Number($('#pay_total').text())*0.4);
    
    $('#payment_name').val(order.name);
    $('#payment_email').val(order.email);
    $('#payment_phone').val(order.phone);
    $('#payment_people').val(order.people);
    $('#payment_date').val(order.date);
    $('#payment_time').val(order.time);
    $('#payment_food_list').text(order.arrayFood.length !==0 ? order.arrayFood.map(function(item){
      return item.Ten
  }): 'None')
    $('#payment_total').text($('#pay_total_price').text())
    $('#btn_open_payment').click(function (e) { 
        e.preventDefault();
        $('.payment_modal').css('display','flex');
    });
    $('#btn_exit_payment').click(function (e) { 
        e.preventDefault();
        $('.payment_modal').css('display','none');
    });
    $('#payment_card_name').keyup(function (e) { 
      e.preventDefault();
      $('#card_name_nofication').text('');
    });
    $('#payment_card_number').keyup(function (e) { 
      e.preventDefault();
      $('#card_number_nofication').text('');
    });
    $('#btn_pay_payment').click(function (e) { 
      e.preventDefault();
      if($('#payment_card_name').val() !== '' && $('#payment_card_number').val() !==''){
        $('#payment_nofication').text('Loading.....');
        var user_order = {
          name :$('#payment_name').val(),
          email: $('#payment_email').val(),
          phone: $('#payment_phone').val(),
          people: $('#payment_people').val(),
          date: $('#payment_date').val(),
          time: $('#payment_time').val(),
          pay: $('#payment_total').text(),
          card_name: $('#payment_card_name').val(),
          card_number: $('#payment_card_number').val(),
          arrayFood: order.arrayFood
        }
        $.ajax({
          type: "POST",
          url: "http://localhost:8080/ThemDatBan",
          data: JSON.stringify(user_order),
          dataType: "json",
          success: function (response) {
            if(response.noi_dung){
              $('#payment_nofication').text('Payment Successfully !!');
              $('.payment_modal').css('display','none  ');
            }
            else{
              $('#payment_nofication').text('Fail !!');
            }
          }
        });              
      }
      else{
        $('#card_name_nofication').text('You must type !!');
        $('#card_number_nofication').text('You must type !!');
      }
    });
});