

$(document).ready(function () {
    foods = JSON.parse(sessionStorage.getItem('arrayfood'))
    $('#food_list').html(foods.map(function(item){
        return `<div class="food_item d-flex align-items-center mt-3">
        <span class="text-uppercase mr-2">${item.Ten}</span>
        <div class="btn_remove_food btn btn-danger" value='${JSON.stringify(item)}'><i class="fa fa-remove"></i></div>
      </div>`
    }));
    $('#btn_submit_booktable').click(function (e) { 
        e.preventDefault();
        console.log($("#booktable_form").serializeArray());
        sessionStorage.setItem('order',JSON.stringify({
            date: $('#book_date').val(),
            time: $('#book_time').val(),
            people: $('#book_people').val(),
            name: $('#book_name').val(),
            phone: $('#book_phone').val(),
            email: $('#book_email').val(),
            arrayFood: foods
        }))
        document.location.href = 'http://127.0.0.1:5500/pato-master/thanhtoan.html'
    });
    $('.btn_remove_food').each(function (index, element) {
        $(element).click(function (e) { 
            e.preventDefault();
            var newfoods = foods.filter(function(item){
                return item.Ma_so !== JSON.parse($(element).attr('value')).Ma_so
            })
            foods = newfoods
            sessionStorage.setItem('arrayfood',JSON.stringify(foods))
            console.log(sessionStorage.getItem('arrayfood'))
            $('#food_list').html(foods.map(function(item){
                return `<div class="food_item d-flex align-items-center mt-3">
                <span class="text-uppercase mr-2">${item.Ten}</span>
                <div class="btn_remove_food btn btn-danger" value='${JSON.stringify(item)}'><i class="fa fa-remove"></i></div>
              </div>`
            }));
        });
    });
});