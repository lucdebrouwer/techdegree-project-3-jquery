// Plan
// Problem: We want to create an interactive usage of the form. The end user needs to receive feedback messages when input is incorrect or the user interacts with the form.
// This interactive form shouldn't be able to submit until everything is correctly filled and no errors are shown.
// Solution: To make this project easy to understand we will use jQuery for its ease. This project will have a functional approach and will be devided into sections.
// Each section has it own block of code relative to their section. Comments will clarify why a decision is made.

/* ----------------Selectors ----------------*/
const nameInput = $('#name')
const emailInput = $("#mail")
const title = $("#title");
const form = $("form");
const colorList = $('#color');
const colorLabel = $('#colors-js-puns').children().first();
const activities = $('.activities')
const payment = $('#payment');
const paypalField = $('fieldset div:contains("PayPal")');
const bitcoinField = $('fieldset div:contains("Bitcoin")');
const creditCardField = $("#credit-card");
const ccInput = $('#cc-num');
const ccZip = $('#zip');
const creditCvv = $('#cvv');
/* ---------------- Functions ---------------- */
const validatePersonalInfo = (nameInp, emailInp) => {

// User should be able to provide his or her name. This field can not be empty.
// If the field is empty, mark the border red and give the user a warning that the field can not be empty

    nameInp.on('input', function() {
        let nameErrorMessages = [];
        let nInput = $(this);
        let name = nInput.val();


        if(name) {
            nameInp.removeClass('invalid');
            nameInp.addClass("valid");
            if(nameErrorMessages.length === 0) {
                $('#name').siblings()[1].innerHTML = "Name: ";
                nameErrorMessages = [];
            }            
        }
        else {
            nameInp.removeClass('valid');
            nameInp.addClass('invalid');
            nameErrorMessages.push({error: "* Name field can not be empty"});
        }
        for(let i = 0; i < nameErrorMessages.length; i+= 1) {
            if(nameErrorMessages.length > 0) {
                //console.log(nameErrorMessages[i]);
                $('#name').siblings()[1].innerHTML = "Name: " + "<span class='invalid'>" + nameErrorMessages[i].error + "</span>";
            }
        }
    });

// User should be able to provide his or her email. This field can not be empty and must be valid.
// If the user input does not contain an @ : Mark the field invalid, provide a warning that the field is invalid.
    emailInp.on('input', function() {
        let mailErrorMessages = [];
        let mIput = $(this);
        let email = mIput.val();

        let mailExpression = new RegExp(`^[^@]+@[^@.]+\.[a-z]+$`); // note to my project reviewer: thanks for the reg expcourse link
        if(email) {
            if(mailExpression.test(email)) {
                console.log("passed");
                emailInp.removeClass('invalid');
                emailInp.addClass('valid');
                $('#mail').siblings()[3].innerHTML = "Email: ";
                mailErrorMessages = [];
            } else{
                console.log("didn't pass!");
                mailErrorMessages.push({error: "* Email is invalid"});
                emailInp.removeClass('valid');
                emailInp.addClass('invalid'); 
            }
        } else {
            mailErrorMessages.push({error: "* Field is empty"});
        }           
        //If there are errors, warn the user
        for(let i = 0; i < mailErrorMessages.length; i+= 1) {
            if(mailErrorMessages.length > 0) {
                $('#mail').siblings()[3].innerHTML = "Email: " + "<span class='invalid'>" + mailErrorMessages[i].error + "</span>";
            }
        }
    });
}

const hideShowTitle = (field) => {
// User should be able to select a title option.
// If 'title other' is selected, show 'title other input'
// Else hide 'title other'
    $('#oth_title').hide();
    field.on('change', function(event){
        if(event.target.value == 'other') {
            $('#oth_title').show();
        } else {
            $('#oth_title').hide();
        }
    });
}

const hideShowDesigns = () => {
    // User should be able to select a t-shirt design. When selected,
    // the user should be able to select a color scheme that matches the t-shirt design.

    // Exceeds : Hide list and label
    colorLabel.hide();
    colorList.hide();

    $('#design').on('change', function(e) {
        colorLabel.show();
        colorList.show();  
        colorList.empty(); // Make sure there are no left over options from previous selection
        // If "I <3 JS " design is selected:
        // 1. "Remove/empty all the color options
        // 2. Append the options that are relative to the selected t-shirt design.d
        if(e.target.value === 'js puns') {
            colorList.append('<option>Cornflower Blue</option>');
            colorList.append('<option>Dark Slate Grey</option>');
            colorList.append('<option>Gold</option>');             
        // if "JS puns " design is selected:
        // 1. "Remove/empty" all the color options
        // 2. Append the options that are relative to the selected t-shirt design.
        } else if(e.target.value === 'heart js') {
            colorList.append('<option>Tomato</option>');
            colorList.append('<option>Steel Blue</option>');
            colorList.append('<option>Dim Grey</option>');
        }
        // Else : Hide the list and label        
        else {
            colorLabel.hide();
            colorList.hide();
        }
        
    });
}

const checkOnActivity = () => {
    const main = $("input[name='all']");
    const jsframeworks = $("input[name='js-frameworks']");
    const jslibs = $("input[name='js-libs']");
    const express = $("input[name='express']");
    const node = $("input[name='node']");
    const buildtools = $("input[name='build-tools']");
    const npm = $("input[name='npm']");
    
    let total = 0;
    activities.append("<span id='totalCost'></span>");
    let totalCost = $('#totalCost');

    // This is where the magic happens
    // Listen for checked state and take action
    activities.on("change", (e) => {
        const checked = e.target.checked;
        if(e.target === main[0]) {
            if(!checked) {
                total -= 200;

            } else {
                total += 200;
            }
        }
        else {
            // Check which activity is checked
            // if activity conflicts with another activity, disable the conflicting activity
            // set the label text to grey to visually show it is not an option
            switch(e.target) {
                case (jsframeworks[0]): {

                    if(!checked) {
                        total -= 100;
                        express[0].disabled = false;
                        express[0].parentNode.style.color = 'black';
                    } else {
                        
                      express[0].disabled = true;
                      express[0].parentNode.style.color = 'grey';
                        total += 100;
                    }

                    break;
                }
                case (jslibs[0]): {
                    if(!checked) {
                        total -= 100;
                        node[0].disabled = false;
                        node[0].parentNode.style.color = 'black';
                    } else {
                        total += 100;
                        node[0].disabled = true;
                        node[0].parentNode.style.color = 'grey';
                    }
                    break;

                }
                case (express[0]): {
                    if(!checked) {
                        jsframeworks[0].disabled = false;
                        jsframeworks[0].parentNode.style.color = 'black';
                        total -= 100;
                    } else {

                        jsframeworks[0].disabled = true;
                        jsframeworks[0].parentNode.style.color = 'grey';
                        total += 100;
                    }
                    break;
                }
                case(node[0]): {
                    if(!checked) {
                        jslibs[0].disabled = false;
                        jslibs[0].parentNode.style.color = 'black';
                        total -= 100;

                    } else {
                        jslibs[0].disabled = true;
                        jslibs[0].parentNode.style.color = 'grey';
                        total += 100;
                    }
                    break;
                }
                case (buildtools[0]): {
                    if(!checked) {
                        total -= 100;
                    } else {
                        total += 100;
                    }
                    break;
                }
                case (npm[0]): {
                    if(!checked) {
                        total -= 100;
                    } else {
                        total += 100;
                    }
                    break;
                }
            }
        }
        // Display the total cost
        totalCost[0].innerText = "Total: $ " + total;
        
    });
}
const validateCheckboxes = (box) => {
    // if there is more than one activity checked, validation passes.
    // Else mark field red
    if(box.length > 0) {
        activities.removeClass("invalid").addClass("valid");
        return true;
    } else {
        activities.removeClass("valid").addClass("invalid");
        return false;
    }    
}

const checkPaymentSelection = () => {
    // Disable the default select method
    // Make it no longer the selected option
    // Set credit_card as default 
    $('#payment option[value="select_method"').attr('disabled', true);
    $('#payment option[selected]').removeAttr('selected');
    $('#payment option[value="credit card"]').attr('selected', true);


    paypalField.hide();
    bitcoinField.hide();

    payment.on('change', (e) => {
        ccInput.removeClass('invalid');
        ccZip.removeClass('invalid');
        creditCvv.removeClass('invalid');

        if(e.target.value === 'credit card') {
            $('#credit-card').show();
            // Hide paypal and bitcoin section
            paypalField.hide();
            bitcoinField.hide();

            // Do live validation
            validateCreditNum();
            validateCreditZip();
            validateCreditCvv();

        } else if (e.target.value === 'paypal') {
            // Hide creditcard and bitcoin
            creditCardField.hide();
            bitcoinField.hide();
            paypalField.show();
        }
        else if(e.target.value === 'bitcoin'){
            // Hide creditcard and paypal
            creditCardField.hide();
            paypalField.hide();
            // Show Bitcoin
            bitcoinField.show();
        }
        else {
            // Show everything
            //creditCardField.removeClass("invalid").addClass('valid');
            $('#payment option[value="credit card"]').attr('selected', false);
        }        
    });
  
}
const validateCreditNum = () => {
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

        //console.log(ccNum);
    });
}
const validateCreditZip = () => {
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
}

const validateCreditCvv = () => {
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

const validateCreditNumOnSubmit = (num) => {
    
    if(num.val()) {
        let numReg = new RegExp('^[0-9]{13,16}$');
        if(numReg.test(num.val())) {
            num.removeClass('invalid').addClass('valid');
            return true;           
        } else {
            num.removeClass('valid').addClass('invalid');
            return false;
        }
    } else {
        num.removeClass('valid').addClass('invalid');
        return false;
    }
}

const validateCreditZipOnSubmit = (zip) => {
    if(zip.val()) {
        let zipReg = new RegExp('^[0-9]{5}$');
        if(zipReg.test(zip.val())) {
            zip.removeClass('invalid').addClass('valid');
            return true;           
        } else {
            zip.removeClass('valid').addClass('invalid');
            return false;
        }
    } else {
        zip.removeClass('valid').addClass('invalid');
        return false;
    }
}
const validateCreditCvvOnSubmit = (cvv) => {

    if(cvv.val()) {
        let cvvReg = new RegExp('^[0-9]{3}$');
        if(cvvReg.test(cvv.val())) {
            cvv.removeClass('invalid').addClass('valid');
            return true;           
        } else {
            cvv.removeClass('valid').addClass('invalid');
            return false;
        }
    } else {
        cvv.removeClass('valid').addClass('invalid');
        return false;
    }
}

const validateNameOnSubmit = (nameInp) => {
    
    if(nameInp.val() === '') {
        nameInp.removeClass('valid').addClass('invalid');
        return false;
    } else {
        nameInp.removeClass('invalid');
        return true;
    }

}
const validateMailOnSubmit = (emailInp) => {
    //let mailErrorMessages = [];
    let mailExpression = new RegExp(`^[^@]+@[^@.]+\.[a-z]+$`); // note to my project reviewer: thanks for the reg expcourse link
    if(emailInp.val()) {
        if(mailExpression.test(emailInp.val())) {
            console.log("passed");
            emailInp.removeClass('invalid');
            emailInp.addClass('valid');
            return true;
            //mailErrorMessages = [];
        } else{
            console.log("didn't pass!");
            emailInp.removeClass('valid');
            emailInp.addClass('invalid'); 
            return false;
        }
    } else {
        emailInp.addClass('invalid');
        return false;
    } 
}
/* ---------------- Personal info ---------------- */

// When document loads, set focus on the name input field
$(document).ready(function(){
    nameInput.focus();
});

// This function checks on (live) user input.
// Marks incorrect fields red and provides an error message
validatePersonalInfo(nameInput, emailInput);


hideShowTitle(title); // Hide or show the title other field based on selection

/* ---------------- T-shirt section ---------------- */

hideShowDesigns(); // Checks what design is selected, updates the color select accordingly

/* ---------------- Activities section ---------------- */

checkOnActivity(); // Checks what activity is checked, if activity conflicts with another it will be disabled

/* ---------------- Payment section ---------------- */

checkPaymentSelection(); // Checks for selected payment option, based on selection fields should hide or appear
validateCreditNum(); // Checks for live input, uses regex to validate the Creditnumber
validateCreditZip(); // Checks for live input, uses regex to validate the ZIP code
validateCreditCvv(); // Checks for live input, uses regex to validate the CVV code

/* ---------------- Form submit ---------------- */
form.on('submit', (e) => {

    // Validate all
    validateNameOnSubmit(nameInput);
    validateMailOnSubmit(emailInput);
    validateCheckboxes($("input[type='checkbox']:checked"));

    // Validate only if creditcard is selected
    let selected_option = $('#payment option:selected').val();
    if(selected_option === 'credit card') {
        if(!validateCreditNumOnSubmit(ccInput)) {
            e.preventDefault();
        }
        if(!validateCreditZipOnSubmit(ccZip)) {
            e.preventDefault();
        }
        if(!validateCreditCvvOnSubmit(creditCvv)) {
            e.preventDefault();
        }
    }

    // Check the rest of the validations, if it doesn't fail allow form submit
    if(!validateNameOnSubmit(nameInput) || !validateMailOnSubmit(emailInput) || !validateCheckboxes($("input[type='checkbox']:checked"))) {
        e.preventDefault();
    }
});
