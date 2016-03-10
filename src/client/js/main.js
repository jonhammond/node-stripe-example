// add scripts
Stripe.setPublishableKey('pk_test_ag8tmFNIwti0SOME2bwILOpq');


$(document).on('ready', function() {
  console.log('sanity check!');
});

$('#product-form').on('submit', function(event){
  event.preventDefault();
  // console.log($('#card-number').val());
  // console.log($('#cvv').val());
  // console.log($('#expiry-month').val());
  // console.log($('#expiry-year').val());

  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#cvv').val(),
    exp_month: $('#expiry-month').val(),
    exp_year: $('#expiry-year').val()
  }, stripeResponseHandler);

  $('#submit-btn').prop("disabled", true);
});

function stripeResponseHandler(status, response) {
  var $form = $('#product-form');
  if (response.error) {
    // Show the errors on the form
    $('form-errors').show();
    $('form-errors').html(response.error.message);
    $('#submit-btn').prop("disabled", false);
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    $form.get(0).submit();
  }
}