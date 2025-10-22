
var cartBody = document.getElementById("cart-body");
var totalAmount = document.getElementsByClassName("total")[0].getElementsByTagName("span")[0];
var addButtons = document.getElementsByClassName("service-item");
var bookBtn = document.getElementsByClassName("book-btn")[0];
var newsletterForm = document.getElementById("newsletter-form");
var emailMessage = document.getElementsByClassName("emailMessage")[0];

var cart = [];
var total = 0;

// ============ ADD TO CART ============
for (var i = 0; i < addButtons.length; i++) {
    (function (i) {
        var btn = addButtons[i].getElementsByTagName("button")[0];
        btn.addEventListener("click", function () {
            var serviceText = addButtons[i].getElementsByTagName("p")[0].innerText;
            var parts = serviceText.split(" - ");
            var name = parts[0].trim();
            var price = parseFloat(parts[1].replace("₹", ""));

            if (btn.innerText.indexOf("Add") !== -1) {
                cart.push({ name: name, price: price });
                total += price;
                btn.innerText = "Remove Item";
                btn.style.backgroundColor = "#e63946";
            } else {
                for (var j = 0; j < cart.length; j++) {
                    if (cart[j].name === name) {
                        total -= cart[j].price;
                        cart.splice(j, 1);
                        break;
                    }
                }
                btn.innerText = "Add Service";
                btn.style.backgroundColor = "#007bff";
            }

            updateCart();
        });
    })(i);
}

// ============ UPDATE CART ============
function updateCart() {
    if (cart.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:#888;">No items added yet</td></tr>';
    } else {
        var html = "";
        for (var i = 0; i < cart.length; i++) {
            html += "<tr><td>" + (i + 1) + "</td><td>" + cart[i].name + "</td><td>₹" + cart[i].price.toFixed(2) + "</td></tr>";
        }
        cartBody.innerHTML = html;
    }

    totalAmount.innerText = "₹" + total.toFixed(2);
}

// ============ SEND EMAIL FUNCTION ============
function sendBookingEmail(name, email, phone, services, totalAmount) {
    // Create service list for email
    var serviceList = services.map(function (s, i) {
        return (i + 1) + ". " + s.name + " - ₹" + s.price.toFixed(2);
    }).join("\n");

    // Email template parameters
    var templateParams = {
        to_name: name,
        to_email: email,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        services: serviceList,
        total_amount: "₹" + totalAmount.toFixed(2),
        service_count: services.length
    };

    // Show loading state
    bookBtn.disabled = true;
    bookBtn.innerText = "Sending...";

    // Send email using EmailJS
    emailjs.send('service_31qoh5f', 'template_x2g5q2e', templateParams)
        .then(function (response) {
            console.log('Email sent successfully!', response.status, response.text);

            // Show confirmation message
            emailMessage.innerHTML =
                "<ion-icon name=\"information-circle-outline\" class=\"icon-small\"></ion-icon>" +
                "<p>Booking Confirmed, Email has been sent</p>";

            emailMessage.classList.add('show');
            alert("Thank you " + name + "! Your booking is confirmed. A confirmation email has been sent to " + email + ".");
            

            // Reset form and cart
            resetBookingForm();
        }, function (error) {
            console.log('Failed to send email:', error);
            alert("Booking saved! However, we couldn't send the confirmation email. We'll contact you at " + phone + " soon.");
            // Still show confirmation
            emailMessage.innerHTML =
                "<h2>Unable to sent Email</h2>";
            emailMessage.classList.add('show');
            resetBookingForm();
        });
}

// ============ RESET BOOKING FORM ============
function resetBookingForm() {
    var inputs = document.getElementsByClassName("booking-form")[0].getElementsByTagName("input");

    cart = [];
    total = 0;

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    for (var i = 0; i < addButtons.length; i++) {
        var btn = addButtons[i].getElementsByTagName("button")[0];
        btn.innerText = "Add Service";
        btn.style.backgroundColor = "#007bff";
    }

    updateCart();

    // Re-enable button
    bookBtn.disabled = false;
    bookBtn.innerText = "Book Now";
}

// ============ BOOKING FORM ============
bookBtn.addEventListener("click", function () {
    var inputs = document.getElementsByClassName("booking-form")[0].getElementsByTagName("input");
    var name = inputs[0].value.trim();
    var email = inputs[1].value.trim();
    var phone = inputs[2].value.trim();

    if (!name || !email || !phone) {
        alert("Please fill all booking details!");
        return;
    }

    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    if (cart.length === 0) {
        alert("Please add at least one service before booking!");
        return;
    }

    // Send email
    sendBookingEmail(name, email, phone, cart, total);
});

// ============ NEWSLETTER FORM ============
newsletterForm.onsubmit = function (e) {
    e.preventDefault();
    var name = newsletterForm.getElementsByTagName("input")[0].value;
    var email = newsletterForm.getElementsByTagName("input")[1].value;

    alert("🎉 Thank you " + name + "! You've subscribed with " + email + ".");
    newsletterForm.reset();
};

// ============ NAVBAR SCROLL EFFECT ============
var navbar = document.getElementsByTagName("nav")[0];
window.onscroll = function () {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
    } else {
        navbar.style.boxShadow = "none";
    }
};

// ============ HAMBURGER MENU ============
var hamburger = document.getElementsByClassName("hamburger")[0];
var navLinks = document.getElementsByClassName("nav-links")[0];

hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("toggle");
});

// Close menu when clicking a link
var navLinksItems = document.querySelectorAll(".nav-links a");
navLinksItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        hamburger.classList.remove("toggle");
    });
});
