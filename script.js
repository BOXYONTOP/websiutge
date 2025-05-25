    const [hours, minutes] = timeInput.value.split(':').map(Number);
    if(hours < 9 || hours > 18 || (hours === 18 && minutes > 0)){
      alert('Please select a start time between 9:00 and 18:00.');
      timeInput.focus();
      return;
    }
    // Check if session end time exceeds 20:00 (6 PM + 2 hours)
    const sessionEndHour = hours + 2;
    if(sessionEndHour > 20 || (sessionEndHour === 20 && minutes > 0)){
      alert('Your 120-minute session cannot end after 8:00 PM. Please choose an earlier start time.');
      timeInput.focus();
      return;
    }
    // Collect booking details
    const bookingDetails = {
      name: bookingForm.name.value.trim(),
      email: bookingForm.email.value.trim(),
      phone: bookingForm.phone.value.trim(),
      location: bookingForm.location.value.trim(),
      date: dateInput.value,
      time: timeInput.value
    };
    // Save booking details to localStorage
    localStorage.setItem('lastBooking', JSON.stringify(bookingDetails));
    // Generate custom payment link
    const customData = encodeURIComponent(`Phone:${bookingDetails.phone};Location:${bookingDetails.location};Date:${bookingDetails.date};Time:${bookingDetails.time}`);
    const baseUrl = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=photographer@example.com&item_name=Photography+Session+120+Minutes&amount=150.00&currency_code=USD";
    const returnUrl = "https://yourwebsite.com/thankyou.html";
    const cancelUrl = "https://yourwebsite.com/cancel.html";
    let paymentUrl = baseUrl + "&custom=" + customData;
    paymentUrl += "&return=" + encodeURIComponent(returnUrl);
    paymentUrl += "&cancel_return=" + encodeURIComponent(cancelUrl);
    // Redirect to PayPal payment page
    window.location.href = paymentUrl;
  });
})();
