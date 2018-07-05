export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if(rules.required) {  //if it has a required property
    isValid = value.trim() !== '' && isValid;  //trim() removes white spaces at the beginning or end. if the value passed is empty, then set isValid to true
  }

  if(rules.minLength){
    isValid = value.length >= rules.minLength && isValid;
  }

  if(rules.maxLength){
    isValid = value.length <= rules.maxLength && isValid;
  }
  
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }

  return isValid;
}