var cartBody = document.getElementById("cart-body");
var totalAmount = document.getElementsByClassName("total")[0].getElementsByTagName("span")[0];
var addButtons = document.getElementsByClassName("service-item");
var bookBtn = document.getElementsByClassName("book-btn")[0];
var newsletterForm = document.getElementById("newsletter-form");
var confirmationPlaceholder = document.getElementsByClassName("confirmation-placeholder-div")[0];

var cart = [];
var total = 0;

// ============ ADD TO CART ============
for (var i = 0; i < addButtons.length; i++) {
    (function (i) {
        var btn = addButtons[i].getElementsByTagName("button")[0];
        btn.addEventListener("click", function () {
            var serviceText = addButtons[i].getElementsByTagName("p")[0].innerText;
            var parts = serviceText.split(" - ");
            var name = parts[0];
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
                btn.innerText = "Add Item";
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

// ============ BOOKING FORM ============
bookBtn.addEventListener("click", function () {
    var inputs = document.getElementsByClassName("booking-form")[0].getElementsByTagName("input");
    var name = inputs[0].value;
    var email = inputs[1].value;
    var phone = inputs[2].value;

    if (!name || !email || !phone) {
        alert("Please fill all booking details!");
        return;
    }

    if (cart.length === 0) {
        alert("Please add at least one service before booking!");
        return;
    }

    // Show confirmation message
    confirmationPlaceholder.innerHTML =
        "<h2>Booking Confirmed 🎉</h2>" +
        "<p>Thank you, <strong>" + name + "</strong>! We’ve received your booking of <strong>" +
        cart.length + "</strong> service(s).</p>" +
        "<p>Total Amount: <strong>₹" + total.toFixed(2) + "</strong></p>" +
        "<p>We’ll contact you shortly at <strong>" + email + "</strong>.</p>";

    // Scroll to confirmation section
    confirmationPlaceholder.scrollIntoView({ behavior: "smooth" });

    // Reset
    cart = [];
    total = 0;
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    for (var i = 0; i < addButtons.length; i++) {
        var btn = addButtons[i].getElementsByTagName("button")[0];
        btn.innerText = "Add Item";
        btn.style.backgroundColor = "#007bff";
    }

    updateCart();
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
