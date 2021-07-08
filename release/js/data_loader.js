var product_card_tpl=`
<div class="card product-card">
    <div class="card-content">
        <div class="header">«Долина Джентау» в&nbsp;одноразовой таре</div>
        <div class="lr-pair">
            <div class="left">
                <a class="rs-favorite"></a>
                <a href="/product.html" class="lazy-image product-image contain" data-src="/img/mirabelle.png"></a>
            </div>
            <div class="right grow">
                <!-- <div class="sub-header">Вода питьевая</div> -->
                <div class="lr-pair table-header">
                    <div class="left">Бутылок</div>
                    <div class="separator grow"></div>
                    <div class="right">Цена</div>
                </div>
                <div class="lr-pair dotted">
                    <div class="left count">1</div>
                    <div class="separator grow"></div>
                    <div class="right price">130₽ *</div>
                </div>
                <div class="lr-pair dotted not-first">
                    <div class="left count">от 2х</div>
                    <div class="separator grow"></div>
                    <div class="right price">120₽ *</div>
                </div>
                <div class="lr-pair dotted not-first">
                    <div class="left count">от 4х</div>
                    <div class="separator grow"></div>
                    <div class="right price">11 000₽ *</div>
                </div>
                <p class="note">
                    * - при наличии оборотной тары. К обмену принимается тара только от воды из ассортимента нашего магазина.
                </p>
            </div>
        </div>
    </div>
    <div class="separator"></div>
    <form class="card-footer">
        <div class="lr-pair">
            <div class="left grow">
                <div class="add-cart">
                    <div class="plus">
                        <a>–</a>
                    </div>
                    <div class="input" contenteditable="true">0</div>
                    <div class="minus">
                        <a>+</a>
                    </div>
                </div>
                <input type="hidden" name="product_id" value="1" />
                <input type="hidden" name="count" />
            </div>
            <div class="right">
            <a href="javascript:void(0);" class="btn btn-flat green-text waves-effect waves-dark credit">Кредит</a>
            <a href="#set" class="btn btn-flat waves-effect waves-dark modal-trigger">Купить</a>
            </div>
        </div>
    </form>
</div>
`

var product_card_tpl2=`
<div class="card product-card">
    <div class="card-content">
        <div class="header">«Долина Джентау» в&nbsp;одноразовой таре</div>
        <div class="lr-pair">
            <div class="left">
                <a href="/product.html" class="lazy-image product-image contain" data-src="/img/mirabelle.png"></a>
            </div>
            <div class="right grow">
                <!-- <div class="sub-header">Вода питьевая</div> -->
                <div class="lr-pair dotted">
                    <div class="left count">Цена</div>
                    <div class="separator grow"></div>
                    <div class="right price old-price">100₽ *</div>
                </div>
                <span class="new-price">100₽</span>
            </div>
        </div>
    </div>
    <div class="separator"></div>
    <form class="card-footer">
        <div class="lr-pair">
            <div class="left grow">
                <div class="add-cart">
                    <div class="plus">
                        <a>–</a>
                    </div>
                    <div class="input" contenteditable="true">0</div>
                    <div class="minus">
                        <a>+</a>
                    </div>
                </div>
                <input type="hidden" name="product_id" value="1" />
                <input type="hidden" name="count" />
            </div>
            <div class="right">
                <a href="javascript:void(0);" class="btn btn-flat waves-effect waves-dark">Купить</a>
            </div>
        </div>
    </form>
</div>
`

var slider_card_tpl = `
<div class="card-wrapper swiper-slide">
`+product_card_tpl+`
</div>
`;

var col_card_tpl = `
<div class="col xl3 l4 m6 s12">
`+product_card_tpl+`
</div>`;

var col_card_tpl2 = `
<div class="col xl3 l4 m6 s12">
`+product_card_tpl2+`
</div>`;

var history_row_tpl = `
<tr>
    <td>[+1+]</td>
    <td>[+2+]</td>
    <td>[+3+]</td>
    <td>[+4+]</td>
</tr>
`

$(() => {
    fillSlider();
    fillProducts();
    fillHistory();
})

function fillHistory(){
    if($('#history-wrapper').length){
        $.ajax({
            url: "/data/history.json",
            success: response => {
                
                $(response.history).each((index, entry) => {
                    
                    var row = history_row_tpl
                        .replaceAll("[+1+]", entry.id)
                        .replaceAll("[+2+]", entry.date)
                        .replaceAll("[+3+]", entry.description)
                        .replaceAll("[+4+]", entry.amount + " р.")

                    $('#history-wrapper').append(row);
                })
            }
        })
    }
}

function fillSlider(){
    for(f=0; f<=14; f++){
        var slide_card_dom = $(slider_card_tpl);
        if(f == 1 || f == 3){
            $(slide_card_dom).addClass('single-price');
        }
        $('#misc-products-container').append(slide_card_dom);
    }
}

function fillProducts(){

    for(f=0; f<22; f++){
        var colCard = col_card_tpl;
        var colCard2 = col_card_tpl2;

        if(f == 8){
            colCard = colCard.replace("«Долина Джентау» в&nbsp;одноразовой таре", "Горный воздух")
            colCard2 = colCard2.replace("«Долина Джентау» в&nbsp;одноразовой таре", "Горный воздух")
        }

        $('#products').append(colCard);
        $('#products2').append(colCard2);
    }
}