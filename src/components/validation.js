export { enableValidation, clearValidation };

function isValid(formSelector, inputSelector, validationConfig) {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage); 
  } else {
    inputSelector.setCustomValidity('');
  };
  if (!inputSelector.validity.valid) {
    showErrorMessage(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hiddenErrorMessage(formSelector, inputSelector, validationConfig);
  };
};

function showErrorMessage(formSelector, inputSelector, errorMessage) {
  const textInputError = formSelector.querySelector(`.${inputSelector.id}-error`);
  const errorClass = document.querySelector('.popup'); 

  inputSelector.classList.add('popup__input_type_error');
  textInputError.classList.add(`${inputSelector.id}-error_active`);
  textInputError.textContent = errorMessage;
  errorClass.classList.add('popup__error_visible');
};

function hiddenErrorMessage(formSelector, inputSelector, validationConfig) {
  const textInputError = formSelector.querySelector(`.${inputSelector.id}-error`);
  const errorClass = document.querySelector('.popup'); 

  inputSelector.classList.remove(validationConfig.inputErrorClass);
  textInputError.classList.remove(`${inputSelector.id}-error_active`);
  textInputError.textContent = '';
  errorClass.classList.remove(validationConfig.inputErrorClass);
};

function setEventListenerForms(formSelector, validationConfig) {
  const inputSelector = Array.from(formSelector.querySelectorAll(validationConfig.inputSelector));
  const submitButtonSelector = formSelector.querySelector(validationConfig.submitButtonSelector);
  toggleButton(inputSelector, submitButtonSelector, validationConfig);

  inputSelector.forEach(inputElement => {
    inputElement.addEventListener('input', function() {  
      isValid(formSelector, inputElement, validationConfig);
      toggleButton(inputSelector, submitButtonSelector, validationConfig);
    });
  });
};

function hasInvalidInput(inputSelector) {
  return inputSelector.some(input => {
    return !input.validity.valid;
  });
};

function toggleButton(inputSelector, submitButtonSelector, validationConfig) {
  if (hasInvalidInput(inputSelector)) {
    submitButtonSelector.setAttribute('disabled', true);;
    submitButtonSelector.classList.add(validationConfig.inactiveButtonClass);
    submitButtonSelector.setAttribute('aria-disabled', true);
  } else {
    submitButtonSelector.removeAttribute('disabled', false);
    submitButtonSelector.classList.remove(validationConfig.inactiveButtonClass);
    submitButtonSelector.removeAttribute('aria-disabled', false);
  };
};

function enableValidation(validationConfig) {
  const formSelector = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formSelector.forEach(formElement => {
    setEventListenerForms(formElement, validationConfig);

  });
};

function clearValidation (formSelector, validationConfig) {
  const inputError = formSelector.querySelectorAll(validationConfig.inputSelector);
  const buttonDisabled = formSelector.querySelector(validationConfig.submitButtonSelector);

  buttonDisabled.setAttribute('disabled', true);;
  buttonDisabled.classList.add(`${validationConfig.inactiveButtonClass}`);
  buttonDisabled.setAttribute('aria-disabled', true);

  inputError.forEach(inputElement => {
    hiddenErrorMessage(formSelector, inputElement, validationConfig);
  });
};
