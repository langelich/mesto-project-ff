export { enableValidation, clearValidation };

function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); 
  } else {
    inputElement.setCustomValidity('');
  };
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hiddenErrorMessage(formElement, inputElement, validationConfig);
  };
};

function showErrorMessage(formElement, inputElement, errorMessage, validationConfig) {
  const textInputError = formElement.querySelector(`.${inputElement.id}-error`);
  const errorElement = document.querySelector('.popup'); 

  inputElement.classList.add(validationConfig.inputErrorClass);
  textInputError.classList.add(`${inputElement.id}-error_active`);
  textInputError.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

function hiddenErrorMessage(formElement, inputElement, validationConfig) {
  const textInputError = formElement.querySelector(`.${inputElement.id}-error`);
  const errorElement = document.querySelector('.popup'); 

  inputElement.classList.remove(validationConfig.inputErrorClass);
  textInputError.classList.remove(`${inputElement.id}-error_active`);
  textInputError.textContent = '';
  errorElement.classList.remove(validationConfig.inputErrorClass);
};

function setEventListenerForms(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButton(inputList, buttonElement, validationConfig);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {  
      isValid(formElement, inputElement, validationConfig);
      toggleButton(inputList, buttonElement, validationConfig);
    });
  });
};

function hasInvalidInput(inputElement) {
  return inputElement.some(input => {
    return !input.validity.valid;
  });
};

function toggleButton(inputElement, buttonElement, validationConfig) {
  if (hasInvalidInput(inputElement)) {
    buttonElement.setAttribute('disabled', true);;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('aria-disabled', true);
  } else {
    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('aria-disabled', false);
  };
};

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(formElement => {
    setEventListenerForms(formElement, validationConfig);
  });
};

function clearValidation (formElement, validationConfig) {
  const inputError = formElement.querySelectorAll(validationConfig.inputSelector);
  const buttonDisabled = formElement.querySelector(validationConfig.submitButtonSelector);

  buttonDisabled.setAttribute('disabled', true);;
  buttonDisabled.classList.add(`${validationConfig.inactiveButtonClass}`);
  buttonDisabled.setAttribute('aria-disabled', true);

  inputError.forEach(inputElement => {
    hiddenErrorMessage(formElement, inputElement, validationConfig);
  });
};
