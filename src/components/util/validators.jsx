// constants diclared in order for values to be reusable in part 1 and part 2

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_MAX_TODAY = 'MAX_TODAY';
const VALIDATOR_TYPE_MIN_TOMORROW = 'MIN_TOMORROW';

// part 1 is called in parent component which calls reusable component (NewPlace - parant, Input - reusable etc.)

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val
});
export const VALIDATOR_MAXLENGTH = val => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val
});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_MAX_TODAY = () => ({ type: VALIDATOR_TYPE_MAX_TODAY });
export const VALIDATOR_MIN_TOMORROW = () => ({ type: VALIDATOR_TYPE_MIN_TOMORROW });

// part 2 is called in reusable components like 'Input'

export const validate = (value, validators) => {
  let isValid = true;
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_MAX_TODAY) {
      const selectedDate = new Date(value);
      const today = new Date();
      // set time to 0 so only date is compared
      today.setHours(0, 0, 0, 0);
      isValid = isValid && selectedDate <= today;
    }
    if (validator.type === VALIDATOR_TYPE_MIN_TOMORROW) {
      const [y, m, d] = value.split("-").map(Number);
      const selectedDate = new Date(y, m - 1, d); // Local date, no timezone shift

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      isValid = isValid && selectedDate >= tomorrow;
    }
  }
  return isValid;
};
