function removeDynamicIcons(container) {
  if (!container) return;
  const existingIcon = container.querySelector(".dynamic-icon");
  if (existingIcon) {
    existingIcon.remove();
  }
}


function checkPromoCode() {
  const promoInput = document.getElementById("promoInput");
  const promoGroup = document.getElementById("promoGroup");
  const promoContainer = document.getElementById("promoContainer");

  if (!promoInput || !promoGroup || !promoContainer) return;

  promoGroup.classList.remove("has-success");
  promoGroup.classList.remove("has-error");
  removeDynamicIcons(promoContainer);

  const promoValue = promoInput.value.trim().toLowerCase();

  if (promoValue !== "") {
    if (promoValue === "dima") {
      promoGroup.classList.add("has-success");

      const successIcon = document.createElement("i");
      successIcon.classList.add(
        "fa-solid",
        "fa-circle-check",
        "dynamic-icon",
        "success-color",
      );
      promoContainer.appendChild(successIcon);
    } else {
      promoGroup.classList.add("has-error");
    }
  }
}

const promoInputField = document.getElementById("promoInput");
if (promoInputField) {
  promoInputField.onblur = function () {
    checkPromoCode();
  };
}

const cardNumberInput = document.getElementById("cardNumber");
const paymentContainer = document.getElementById("paymentContainer");

if (cardNumberInput && paymentContainer) {
  cardNumberInput.oninput = function (e) {
    let value = e.target.value.replace(/\D/g, "");

    let matches = value.match(/\d{1,4}/g);
    if (matches) {
      e.target.value = matches.join(" ");
    } else {
      e.target.value = "";
    }

    const paymentGroup = paymentContainer.closest(".form-group");
    const paymentError = document.getElementById("paymentError");

    if (value.length === 0) {
      paymentGroup.classList.remove("has-error");
      if (paymentError) paymentError.textContent = "";
    } else if (value.length !== 16) {
      paymentGroup.classList.add("has-error");
      if (paymentError)
        paymentError.textContent = "Card number must be exactly 16 digits.";
    } else {
      paymentGroup.classList.remove("has-error");
      if (paymentError) paymentError.textContent = "";
    }
  };
}

const cardExpiryInput = document.getElementById("cardExpiry");
if (cardExpiryInput && paymentContainer) {
  cardExpiryInput.oninput = function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2) {
      e.target.value = value.substring(0, 2) + "/" + value.substring(2, 4);
    } else {
      e.target.value = value;
    }

    const paymentGroup = paymentContainer.closest(".form-group");
    const paymentError = document.getElementById("paymentError");
    const expiryRegex = /^(0[1-2]|1[0-2])\/?([0-9]{2})$/;

    if (e.target.value.length === 0) {
      paymentGroup.classList.remove("has-error");
      if (paymentError) paymentError.textContent = "";
    } else if (e.target.value.length < 5 || !expiryRegex.test(e.target.value)) {
      paymentGroup.classList.add("has-error");
      if (paymentError) {
        if (value.substring(0, 2) > 12) {
          paymentError.textContent = "Month must be between 01 and 12.";
        } else {
          paymentError.textContent = "Invalid expiry format (use MM/YY).";
        }
      }
    } else {
      paymentGroup.classList.remove("has-error");
      if (paymentError) paymentError.textContent = "";
    }
  };
}

const cardZipInput = document.getElementById("cardZip");
if (cardZipInput && paymentContainer) {
  cardZipInput.oninput = function (e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 5) {
      value = value.substring(0, 5);
    }
    e.target.value = value;

    const paymentGroup = paymentContainer.closest(".form-group");
    const paymentError = document.getElementById("paymentError");

    if (value.length === 0) {
      paymentGroup.classList.remove("has-error");
      if (paymentError) paymentError.textContent = "";
    } else if (value.length !== 5) {
      paymentGroup.classList.add("has-error");
      if (paymentError)
        paymentError.textContent = "Billing ZIP must be exactly 5 digits.";
    } else {
      paymentGroup.classList.remove("has-error");
      if (paymentError) paymentError.textContent = "";
    }
  };
}

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.onsubmit = function (event) {
  event.preventDefault();

  document
    .querySelectorAll(".validation-message")
    .forEach((msg) => (msg.textContent = ""));
  document
    .querySelectorAll(".form-group")
    .forEach((group) => group.classList.remove("has-error"));

  const emailContainer = document.getElementById("emailContainer");
  removeDynamicIcons(emailContainer);

  let isFormValid = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const lettersOnlyRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ'\s-]+$/;
  const digitsOnlyRegex = /^\d+$/;
  const expiryRegex = /^(0[1-2]|1[0-2])\/?([0-9]{2})$/;

  const emailInput = document.getElementById("emailInput");
  const emailGroup = document.getElementById("emailGroup");
  if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
    document.getElementById("emailError").textContent = "Invalid email address";
    emailGroup.classList.add("has-error");

    const errorIcon = document.createElement("i");
    errorIcon.classList.add(
      "fa-solid",
      "fa-circle-exclamation",
      "dynamic-icon",
      "error-color",
    );
    if (emailContainer) emailContainer.appendChild(errorIcon);

    isFormValid = false;
  }

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();

  if (!firstNameValue || !lastNameValue) {
    document.getElementById("nameError").textContent =
      "First name and last name are required.";
    firstName.closest(".form-group").classList.add("has-error");
    isFormValid = false;
  } else if (
    !lettersOnlyRegex.test(firstNameValue) ||
    !lettersOnlyRegex.test(lastNameValue)
  ) {
    document.getElementById("nameError").textContent =
      "Names must contain letters only.";
    firstName.closest(".form-group").classList.add("has-error");
    isFormValid = false;
  } else if (firstNameValue.length < 2 || lastNameValue.length < 2) {
    document.getElementById("nameError").textContent =
      "Names must be at least 2 characters long.";
    firstName.closest(".form-group").classList.add("has-error");
    isFormValid = false;
  }

  const streetAddress = document.getElementById("streetAddress");
  if (!streetAddress.value.trim() || streetAddress.value.trim().length < 3) {
    document.getElementById("addressError").textContent =
      "Please enter a valid street address (min 3 chars).";
    streetAddress.closest(".form-group").classList.add("has-error");
    isFormValid = false;
  }

  const cityInput = document.getElementById("cityInput");
  const stateSelect = document.getElementById("stateSelect");
  const zipInput = document.getElementById("zipInput");
  const cleanZip = zipInput.value.replace(/\s+/g, "");

  if (!cityInput.value.trim() || !stateSelect.value || !zipInput.value.trim()) {
    document.getElementById("geoError").textContent =
      "Please fill out City, State and ZIP fields.";
    cityInput.closest(".form-group").classList.add("has-error");
    isFormValid = false;
  } else if (!lettersOnlyRegex.test(cityInput.value.trim())) {
    document.getElementById("geoError").textContent =
      "City must contain letters only.";
    cityInput.closest(".form-group").classList.add("has-error");
    isFormValid = false;
  } else if (!digitsOnlyRegex.test(cleanZip) || cleanZip.length !== 5) {
    document.getElementById("geoError").textContent =
      "ZIP code must be exactly 5 digits.";
    zipInput.closest(".form-group").classList.add("has-error");
    isFormValid = false;
  }

  const cardNumber = document.getElementById("cardNumber");
  const cardExpiry = document.getElementById("cardExpiry");
  const cardCvv = document.getElementById("cardCvv");
  const cardZip = document.getElementById("cardZip");

  const cleanCardNum = cardNumber.value.replace(/\s+/g, "");
  const cleanCvv = cardCvv.value.trim();
  const cleanCardZip = cardZip.value.replace(/\s+/g, "");

  const paymentGroup = paymentContainer.closest(".form-group");

  if (!cleanCardNum || !cardExpiry.value.trim() || !cleanCvv || !cleanCardZip) {
    document.getElementById("paymentError").textContent =
      "All credit card details are required.";
    paymentGroup.classList.add("has-error");
    isFormValid = false;
  } else if (
    !digitsOnlyRegex.test(cleanCardNum) ||
    cleanCardNum.length !== 16
  ) {
    document.getElementById("paymentError").textContent =
      "Card number must be exactly 16 digits.";
    paymentGroup.classList.add("has-error");
    isFormValid = false;
  } else if (!expiryRegex.test(cardExpiry.value.trim())) {
    document.getElementById("paymentError").textContent =
      "Invalid expiry format (use MM/YY).";
    paymentGroup.classList.add("has-error");
    isFormValid = false;
  } else if (
    !digitsOnlyRegex.test(cleanCvv) ||
    cleanCvv.length < 3 ||
    cleanCvv.length > 4
  ) {
    document.getElementById("paymentError").textContent =
      "CVV must be 3 or 4 digits.";
    paymentGroup.classList.add("has-error");
    isFormValid = false;
  } else if (!digitsOnlyRegex.test(cleanCardZip) || cleanCardZip.length !== 5) {
    document.getElementById("paymentError").textContent =
      "Billing ZIP must be exactly 5 digits.";
    paymentGroup.classList.add("has-error");
    isFormValid = false;
  }

  checkPromoCode();

  if (!isFormValid) return;

  const chosenTechs = [];
  document.querySelectorAll('input[name="tech"]:checked').forEach((box) => {
    chosenTechs.push(box.value);
  });

  const activeDataLimit = document.querySelector(
    'input[name="dataLimit"]:checked',
  ).value;

  const orderPayload = {
    email: emailInput.value.trim(),
    customerInfo: {
      firstName: firstNameValue,
      lastName: lastNameValue,
    },
    addressDetails: {
      street: streetAddress.value.trim(),
      apt: document.getElementById("aptAddress").value.trim(),
      city: cityInput.value.trim(),
      state: stateSelect.value,
      zip: cleanZip,
    },
    cardDetails: {
      number: cleanCardNum,
      expiry: cardExpiry.value.trim(),
      cvv: cleanCvv,
      zip: cleanCardZip,
    },
    radioTechsUsed: chosenTechs,
    monthlyDataExpected: activeDataLimit,
    promoCode: promoInputField.value.trim(),
    annoyingOffersSubscribed: document.getElementById("annoyingOffers").checked,
    createdAt: new Date().toISOString(),
  };

  console.log("Form successfully verified! Payload:", orderPayload);
  alert("Order completed! Data dumped to console.");
};
