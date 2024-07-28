export { validationConfig, enableValidation, clearValidation };

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function isValid(formSelector, inputSelector) {
  if (inputSelector.validity.patternMismatch) {
    inputSelector.setCustomValidity(inputSelector.dataset.errorMessage); 
  } else {
    inputSelector.setCustomValidity('');
  };
  if (!inputSelector.validity.valid) {
    showErrorMessage(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hiddenErrorMessage(formSelector, inputSelector);
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

function hiddenErrorMessage(formSelector, inputSelector) {
  const textInputError = formSelector.querySelector(`.${inputSelector.id}-error`);
  const errorClass = document.querySelector('.popup'); 

  inputSelector.classList.remove('popup__input_type_error');
  textInputError.classList.remove(`${inputSelector.id}-error_active`);
  textInputError.textContent = '';
  errorClass.classList.remove('popup__error_visible');
};

function setEventListenerForms(formSelector) {
  const inputSelector = Array.from(formSelector.querySelectorAll('.popup__input'));
  const submitButtonSelector = formSelector.querySelector('.popup__button');
  toggleButton(inputSelector, submitButtonSelector);

  inputSelector.forEach(inputElement => {
    inputElement.addEventListener('input', function() {  
      isValid(formSelector, inputElement);
      toggleButton(inputSelector, submitButtonSelector);
    });
  });
};

function hasInvalidInput(inputSelector) {
  return inputSelector.some(input => {
    return !input.validity.valid;
  });
};

function toggleButton(inputSelector, submitButtonSelector) {
  if (hasInvalidInput(inputSelector)) {
    submitButtonSelector.setAttribute('disabled', true);;
    submitButtonSelector.classList.add('popup__button_disabled');
    submitButtonSelector.setAttribute('aria-disabled', true);
  } else {
    submitButtonSelector.removeAttribute('disabled', false);
    submitButtonSelector.classList.remove('popup__button_disabled');
    submitButtonSelector.removeAttribute('aria-disabled', false);
  };
};

function enableValidation() {
  const formSelector = Array.from(document.querySelectorAll('.popup__form'));

  formSelector.forEach(formElement => {
    setEventListenerForms(formElement);
  });
};

function clearValidation (formSelector, validationConfig) {
  const inputError = formSelector.querySelectorAll(validationConfig.inputSelector);
  const buttonDisabled = formSelector.querySelector(validationConfig.submitButtonSelector);

  buttonDisabled.setAttribute('disabled', true);;
  buttonDisabled.classList.add('popup__button_disabled');
  buttonDisabled.setAttribute('aria-disabled', true);

  inputError.forEach(inputElement => {
    hiddenErrorMessage(formSelector, inputElement);
  });
};
