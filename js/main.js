$(document).ready(function(){
    $('#name').focus();
    $('#other-title').hide();
    $('#title').on('change', function(event){
        if(event.target.value == 'other') {
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });

 // ---onLoad---

// save options to variable
let $options = $('#color option');
// empty select (in case anything is there from last change)
// remove options from DOM
// hide shirt dropdown
$('#color').empty().hide();

 $('#design').on('change', function(event){
    if(event.target.value == 'js puns') {
        $('#color').empty();
           
        // add matching shirts to select
        // show dropdown

        $('#color').append($options[0]).show();
        $('#color').append($options[1]).show();
        $('#color').append($options[2]).show();
    } else if (event.target.value == 'heart js') {
        $('#color').empty();
        // add matching shirts to select
        // show dropdown
       $('#color').append($options[3]).show();
       $('#color').append($options[4]).show();
       $('#color').append($options[5]).show();
    } else {
        // empty select (in case anything is there from last change)
        $('#color').empty().hide();

    }
 });

 $('.activities').on('change', (e) => {
    const checkbox = e.target;
    const checked = checkbox.checked;
    const label = checkbox.parentNode.textContent;
    console.log(label, checked);
    });
/*

”Register for Activities” section
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time --
you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.

When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/
 });