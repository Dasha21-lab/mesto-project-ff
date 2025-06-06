const showInputError = (formPopup, popupInput, validationConfig, errorMessage) => {
  const formError = formPopup.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.add(validationConfig.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validationConfig.errorClass);
};

const hideInputError = (formPopup, popupInput, validationConfig) => {
  const formError = formPopup.querySelector(`.${popupInput.id}-error`);
  popupInput.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = '';
};

const isValid = (formPopup, popupInput, validationConfig) => {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity("");
  };

  if (!popupInput.validity.valid) {
    showInputError(formPopup, popupInput, validationConfig, popupInput.validationMessage);
  } else {
    hideInputError(formPopup, popupInput, validationConfig);
  };
};

const setEventListeners = (formPopup, validationConfig) => {
  const inputList = Array.from(formPopup.querySelectorAll(validationConfig.inputSelector));
  const buttonPopupSave = formPopup.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      isValid(formPopup, popupInput, validationConfig);

      toggleButtonState(inputList, buttonPopupSave, validationConfig);
    });
  });
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((popupInput) => {
    return !popupInput.validity.valid;
  });
};

const disableSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};

const enableSubmitButton = (buttonElement, validationConfig) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonPopupSave, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonPopupSave, validationConfig);
  } else {
    enableSubmitButton(buttonPopupSave, validationConfig);
  };
};

export function enableValidation (validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formPopup) => {
    setEventListeners(formPopup, validationConfig);
  });
};

export function clearValidation (formPopup, validationConfig) {
  const inputList = Array.from(formPopup.querySelectorAll(validationConfig.inputSelector));
  const buttonPopupSave = formPopup.querySelector(validationConfig.submitButtonSelector);

 inputList.forEach((popupInput) => {
    hideInputError(formPopup, popupInput, validationConfig);
  });

  disableSubmitButton(buttonPopupSave, validationConfig);
};