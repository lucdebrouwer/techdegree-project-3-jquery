 // ---onLoad---
$(document).ready(function(){
/* -------------- Job Title section ---------------- */

    // Set focus on name field
    $('#name').focus();

    // Hide other field
    // Show when title: 'other' is selected
    $('#other-title').hide();
    $('#title').on('change', function(event){
        if(event.target.value == 'other') {
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });


/* --------- T-shirt section ---------- */

// Save the color options in a variable
let $options = $('#color option');

//let $arrayPuns1 = [$options[0], $options[1], $options[2]];


let $arrayPuns = [$options[0], $options[1], $options[2]];
let $arrayHeart  = [$options[3], $options[4], $options[5]];

// empty select (in case anything is there from last change)
// remove options from DOM
// hide shirt dropdown
const colorList = $('#color');
colorList.empty().hide();

// Hide the color Label all together(Exceeds)
const colorLabel = $('#colors-js-puns').children().first();
colorLabel.hide();

$('#design').on('change', function(event){
    colorLabel.show();
     // empty select (in case anything is there from last change)
     // add matching shirts to select
     // show dropdown
    if(event.target.value == 'js puns') {
        $('#color').empty();         
        $('#color').append($arrayPuns).show();
    } else if (event.target.value == 'heart js') {
        $('#color').empty();
        $('#color').append($arrayHeart).show();
    } else {
        // empty select (in case anything is there from last change)
        colorList.empty().hide();
        colorLabel.hide();
    }
 });


 /* ----------- Register section ----------- */

//  const checkboxes = $(':checkbox');
//  checkboxes.on('change', function(e){
//     console.log('test');
//  });


let activitiesArray = $(':checkbox').map(function() {
    return this.parentNode.textContent;
}).get();


 $('.activities').on('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const label = checkbox.parentNode.textContent;
    console.log(label, checked);
    
    

    let myvar = $('.activities :contains(Tuesday 9am-12pm)').map(function() {
        return this.textContent;
    }).get();

    });


/* ----------- ”Register for Activities” section -------------- */ 
/*Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time --
you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.

When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

/* ---------------- Payment section -------------------- */

// Set default payment option to credit card
const test = $('#payment option[value="credit card"]').prop('selected', true);
const test1 = $('#payment option[value="select_method"]').prop('disabled', true);
// Select payment
const creditCardSection = $('#credit-card');
const selectPayment = $('#payment');


function showPaypal() {
    return paypalInfo = $('fieldset div p:contains(PayPal)').show();  
}

function hidePaypal() {
    return paypalInfo = $('fieldset div p:contains(PayPal)').hide();
}

function showBitcoin() {
    return bitcoinInfo = $('fieldset div p:contains(Bitcoin)').show(); 
}
function hideBitcoin() {

    return bitcoinInfo = $('fieldset div p:contains(Bitcoin)').hide();
}


selectPayment.on('change', function(event) {
//    const option = $('#payment').find(":selected").text();

    if(event.target.value == 'credit card') {
        creditCardSection.show();
        hidePaypal();
        hideBitcoin();
    } else if(event.target.value == 'paypal') {
        hideBitcoin();
        creditCardSection.hide();
        showPaypal();
    } else if(event.target.value == 'bitcoin') {
        creditCardSection.hide();
        hidePaypal();
        showBitcoin();
    } else {
        //$('#payment option[value="credit card"]').attr('selected', false);
        creditCardSection.hide()
    
    }
});
hidePaypal();
hideBitcoin();
// Hide paypment info
//$('#credit-card').hide();






 });