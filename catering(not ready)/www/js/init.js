//init modal
$('._order-modal-open').on('click', function (){
        $('#order').bPopup({
            closeClass: 'close',
        });
});

// formstyler
$('select').styler();