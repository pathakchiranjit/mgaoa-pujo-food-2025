const scriptURL = 'https://script.google.com/macros/s/AKfycbzAuVgQyAaXZj3jy2AWQRIhy8x4VPLFQMHoOpj3DIRUj_CSqRD0uPPkPd2pQ7PFyC0i2w/exec'; // Replace with your Apps Script URL

document.getElementById('foodForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(response => {
      document.getElementById('response').textContent = "Booking successful!";

      // WhatsApp message link (pre-filled)
      const message = `Pujo Food Booking Confirmed!\nName: ${data.name}\nFlat: ${data.flat}\nAttendees: ${data.attendees}`;
      const phone = data.phone.replace(/\D/g, '');
      const whatsappURL = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 1000);
    })
    .catch(error => {
      document.getElementById('response').textContent = "Error submitting form.";
    });
});
