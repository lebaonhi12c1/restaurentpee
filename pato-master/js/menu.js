$(document).ready(function () {
    $('#menu_food').html('Loading ....');
    async function  handlefood(){
        await $.ajax({
            type: "GET",
            url: "http://localhost:8080/dsFood",
            success: function (response) {
                $('#menu_food').html(response.map(function(item){
                    return `<div class="col-md-8 col-lg-6 m-l-r-auto">
                    <div class="blo3 flex-w flex-col-l-sm m-b-30">
                        <div class="pic-blo3 size20 bo-rad-10 hov-img-zoom m-r-28">
                            <a href="#"><img src="http://localhost:8080/${item.Ma_so}.png" alt="IMG-MENU"></a>
                        </div>
    
                        <div class="text-blo3 size21 flex-col-l-m">
                            <a href="#" class="txt21 m-b-3">
                                ${item.Ten}
                            </a>
    
                            <span class="txt23">
                                Aenean pharetra tortor dui in pellentesque
                            </span>
    
                            <span class="txt22 m-t-20">
                                ${item.Don_gia_Ban} vnd
                            </span>
                            <span class="nofication_add_${item.Ma_so}"></span>
                            <button class="btn_primary_red btn_add_menu align-self-end" value='${JSON.stringify(item)}' data='${item.Ma_so}'>Add</button>
                        </div>
                    </div>
            </div>`
                }));
            }
        });
        $('.btn_add_menu').each(function (index, element) {
            $(element).click(function (e) { 
                e.preventDefault();
                if(!sessionStorage.getItem('arrayfood')){
                    sessionStorage.setItem('arrayfood',JSON.stringify([JSON.parse($(element).attr('value'))]))
                }
                else{
                    console.log(typeof(JSON.parse(sessionStorage.getItem('arrayfood'))))
                    sessionStorage.setItem('arrayfood',JSON.stringify([...JSON.parse(sessionStorage.getItem('arrayfood')),JSON.parse($(element).attr('value'))]))
                }
                $(`.nofication_add_${$(element).attr('data')}`).text('Added !!');
                $(`.nofication_add_${$(element).attr('data')}`).css('color','var(--primary_cryan_hover')
                setTimeout(() => {
                    $(`.nofication_add_${$(element).attr('data')}`).text('');
                }, 700);
            });
        });
    }
    handlefood()
});