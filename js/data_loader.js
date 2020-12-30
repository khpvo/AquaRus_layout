var product_card_tpl = `
<div class="card-wrapper swiper-slide">
    <div class="card product-card">
        <div class="card-content">
            <div class="lr-pair">
                <div class="left">
                    <div class="lazy-image product-image contain" data-src="/img/mirabelle.png"></div>
                </div>
                <div class="right grow">
                    <div class="header">«Мирабель»</div>
                    <div class="sub-header">Вода питьевая</div>
                    <div class="lr-pair table-header">
                        <div class="left">Бутылок</div>
                        <div class="separator grow"></div>
                        <div class="right">Цена</div>
                    </div>
                    <div class="lr-pair dotted">
                        <div class="left count">1</div>
                        <div class="separator grow"></div>
                        <div class="right price">130₽</div>
                    </div>
                    <div class="lr-pair dotted">
                        <div class="left count">от 2х</div>
                        <div class="separator grow"></div>
                        <div class="right price">120₽</div>
                    </div>
                    <div class="lr-pair dotted">
                        <div class="left count">от 4х</div>
                        <div class="separator grow"></div>
                        <div class="right price">110₽</div>
                    </div>
                </div>
            </div>
        </div>
        <form class="card-footer">
            <div class="lr-pair">
                <div class="left grow">
                    <div class="add-cart">
                        <div class="plus">
                            <a href="">–</a>
                        </div>
                        <div class="input" contenteditable="true">0</div>
                        <div class="minus">
                            <a href="">+</a>
                        </div>
                    </div>
                    <input type="hidden" name="product_id" value="1" />
                    <input type="hidden" name="count" />
                </div>
                <div class="right">
                    <a href="javascript:void(0);" class="btn btn-flat waves-effect waves-red">Купить</a>
                </div>
            </div>
        </form>
    </div>
</div>
`;

$(() => {
    fillSlider();
})

function fillSlider(){
    for(f=0; f<=14; f++){
        $('#misc-products-container').append(product_card_tpl);
    }
}

$(() => {
    
})