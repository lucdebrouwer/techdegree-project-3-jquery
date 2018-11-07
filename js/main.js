
 // ---onLoad---
$(document).ready(function(){
/* -------------- Job Title section ---------------- */


    // Set focus on name field
    $('#name').focus();

/* start Basic info validation */

// This function will be called on form submit, which is located at the end of this file
function checkBasicOnSubmit() {

    const $name = $('#name');
    if($name.val() == '') {
        $name.removeClass('valid').addClass('invalid');
        $('fieldset').children()[1].innerHTML = "Name: " + "<span class='invalid'>* please provide your name</span>";
    } else {
        $name.removeClass('invalid').addClass('valid');
    }

    const $email = $('#mail');
    if($email.val() == '') {
        $email.removeClass('valid').addClass('invalid');
        $('fieldset').children()[3].innerHTML = "Mail: " + "<span class='invalid'>* please provide a valid email address</span>";
    } else {
        $email.removeClass('invalid').addClass('valid');
    }
}

// Validate on live user input
$('#name').on('input', function() {
        let errorMessage = "Name: " + "<span id='errorName'>* please provide your name</span>";
        let input = $(this);
        let name = input.val();
        if(name) {
            $('fieldset').children()[1].innerHTML = 'Name: ';
            $('#errorName').removeClass('invalid');
            input.removeClass('invalid').addClass('valid');

        } else {

        // If field is empty, append an error message into the name label
        $('fieldset').children()[1].innerHTML = errorMessage;
        $('#errorName').addClass('invalid');
            input.removeClass('valid').addClass("invalid");

        }
    });

// Validate on live user input
    $('#mail').on('input', function() {
        let eMessageNotValid = "Email: " + "<span id='errorMail'>* Please provide a valid email address</span>";
        let eMessageEmpty =  'Email: ' + "<span id='errorEmpty'>Please fill in your email</span>";
        let input = $(this);
        let mail = input.val();
        if(mail && mail.indexOf == 1) {
            input.removeClass('invalid').addClass('valid');
        }
        // Check if the user provided an @ in the email input
        if(mail.indexOf('@') != -1) {
            $('fieldset').children()[3].innerHTML = 'Email: ';
            $('#errorMail').removeClass('invalid');
            input.removeClass('invalid').addClass('valid');
        } 
         else {

            // Check if user left email field blank
             if(mail == '') {

                // Clear the label
                // Append the empty input error message
                $('fieldset').children()[3].innerHTML = '';
                $('fieldset').children()[3].innerHTML = eMessageEmpty;
                $('#errorEmpty').addClass('invalid');
             } else {
                // If there is no @ in the input, append the incorrect email error message
                $('fieldset').children()[3].innerHTML = eMessageNotValid;
                $('#errorMail').addClass('invalid');
                input.removeClass('valid').addClass("invalid");
             }

            //input.attr("placeholder", "Email field can't be empty!");
        }
    });    

/* End of Basic info validation */

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


/* ----------- ”Register for Activities” section -------------- */ 

// Select all activities
const activities = $('.activities label');
const checkboxes = $('.activities input[type="checkbox"]');

// Compare selected activity with other selected activity

 // Foreach activity selected, check its content





/*Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time --
you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.

When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

/* ---------------- Payment section -------------------- */

// Set default payment option to credit card

$('#payment option[value="select_method"').attr('disabled', true);
$('#payment option[selected]').removeAttr('selected');
$('#payment option[value="credit card"]').attr('selected', true);

$('fieldset div:contains("PayPal")').hide();
$('fieldset div:contains("Bitcoin")').hide();

// This function is called on form submit, can be found at the end of this file
function checkCreditCardDetailsOnSubmit() {
    // Select the creditcard details 
    const ccInput = $('#cc-num');
    const ccZip = $('#zip');
    const creditCvv = $('#cvv');



    // If one ore more fields is empty, mark them as invalid
    // In all other cases, the fields are not empty, check on input.

        if(ccInput.val() == '') {
            ccInput.removeClass('valid').addClass('invalid');
        } else {
            let num = new RegExp('^[0-9]{13,16}$');
            if(num.test(ccInput.val())) {
                ccInput.removeClass('invalid').addClass('valid');
            } else {
                ccInput.removeClass('valid').addClass('invalid');
            }
        }
    
        if(ccZip.val() == '') {
            ccZip.removeClass('valid').addClass('invalid');
        } else {
            let zip = new RegExp('^[0-9]{5}$');
            if(zip.test(ccZip.val())) {
                ccZip.removeClass('invalid').addClass('valid');
            } else {
                ccZip.removeClass('valid').addClass('invalid');
            }
        }
    
        if(creditCvv.val() == '') {
            creditCvv.removeClass('valid').addClass('invalid');
        } else {
            let ccv = new RegExp('^[0-9]{3}$');
            if(ccv.test(creditCvv.val())) {
                creditCvv.removeClass('invalid').addClass('valid');           
            } else {
                creditCvv.removeClass('valid').addClass('invalid');
            }
        }
        // If all fields are empty, mark them as invalid
        if(ccInput.val() == '' && ccZip.val() == ''  && creditCvv.val() == '') {
            ccInput.removeClass('valid').addClass('invalid');
            ccZip.removeClass('valid').addClass('invalid');
            creditCvv.removeClass('valid').addClass('invalid');
        }

  
}
function checkCreditCardDetails() {
    // Select each respective creditcard details
    // Check on (live) user input
    $('#cc-num').on('input', function() {
        let input = $(this);
        let ccNum = input.val();
        
        // Check whether user input meets Regex
        // Creditcard num should only accept 13-16 digits
        // If valid, mark valid
        // Else mark invalid
        let num = new RegExp('^[0-9]{13,16}$');
        if(num.test(ccNum)) {
            input.removeClass('invalid').addClass('valid');
        } else {
            input.removeClass('valid').addClass('invalid');
        }

        console.log(ccNum);
    });
    $('#zip').on('input', function() {
        let input = $(this);
        let ccZip = input.val();

        // Check whether user input meets Regex
        // ZIP should only accept 5 digits
        let zip = new RegExp('^[0-9]{5}$');
        if(zip.test(ccZip)) {
            input.removeClass('invalid').addClass('valid');
        } else {
            input.removeClass('valid').addClass('invalid');
        }
    });
    
    $('#cvv').on('input', function() {
        let input = $(this);
        let creditCvv = input.val();
        // Check whether user input meets Regex
        // CCV should only accept 3 digits
        let ccv = new RegExp('^[0-9]{3}$');
        if(ccv.test(creditCvv)) {
            input.removeClass('invalid').addClass('valid');           
        } else {
            input.removeClass('valid').addClass('invalid');
        }
    });
}

// Check validation on default selection
if($('#payment option[value="credit card"]').attr('selected', true)) {
    checkCreditCardDetails();
}


$('#payment').on('change', (event) => {
    if(event.target.value == 'credit card') {
        $('#credit-card').show();
        // Hide paypal and bitcoin section
        $('fieldset div:contains("PayPal")').hide();
        $('fieldset div:contains("Bitcoin")').hide();

        // Validate on selection
        checkCreditCardDetails();
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

    $('form').on('submit', (e) => {
        e.preventDefault();
        checkBasicOnSubmit();
        checkCreditCardDetailsOnSubmit();
    })
 });