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
    colorList.show();
    if(event.target.value == 'js puns') {
        $('#color').empty();         
        $('#color').append('<option>Cornflower Blue</option>');
        $('#color').append('<option>Dark Slate Grey</option>');
        $('#color').append('<option>Gold</option>');
    } else if (event.target.value == 'heart js') {
        $('#color').empty();
        $('#color').append('<option>Tomato</option>');
        $('#color').append('<option>Steel Blue</option>');
        $('#color').append('<option>Dim Grey</option>');
    } else {
        // Hide the List and label
        colorList.hide();
        colorLabel.hide();
    }
 });


 /* ----------- Register section ----------- */



/* ----------- ”Register for Activities” section -------------- */ 
/*Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time --
you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.

When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

/* ---------------- Payment section -------------------- */

// Set default payment option to credit card

$('#payment option[value="select_method"').attr('disabled', true);
$('#payment option[selected]').removeAttr('selected');
$('#payment option[value="credit card"]').attr('selected', 'selected');

$('fieldset div:contains("PayPal")').hide();
$('fieldset div:contains("Bitcoin")').hide();

const $payment = $('#payment').on('change', (event) => {
    if(event.target.value == 'credit card') {
        $('#credit-card').show();
        // Hide paypal and bitcoin section
        $('fieldset div:contains("PayPal")').hide();
        $('fieldset div:contains("Bitcoin")').hide();

    } else if (event.target.value == 'paypal') {
        // Hide creditcard and bitcoin
        $('#credit-card').hide();
        $('fieldset div:contains("Bitcoin")').hide();
        $('fieldset div:contains("PayPal")').show();
    }
    else if(event.target.value == 'bitcoin'){
        // Hide creditcard and paypal
        $('#credit-card').hide();
        $('fieldset div:contains("PayPal")').hide();
        // Show Bitcoin
        $('fieldset div:contains("Bitcoin")').show();
    }
    else {
        // Show everything
        $('#payment option[value="credit card"]').attr('selected', false);
    }
    });
 });