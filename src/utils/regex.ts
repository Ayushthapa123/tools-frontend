// hello world

export const regex = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\d{10}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
  number: /^\d+$/,
  numberWithDecimal: /^\d*\.?\d+$/,
  numberWithDecimalAndNegative: /^-?\d*\.?\d+$/,
  numberWithDecimalAndNegativeAndPositive: /^-?\d*\.?\d+$/,
  numberWithDecimalAndNegativeAndPositiveAndZero: /^-?\d*\.?\d+$/,
  numberWithDecimalAndNegativeAndPositiveAndZeroAndNegative: /^-?\d*\.?\d+$/,
  numberWithDecimalAndNegativeAndPositiveAndZeroAndNegativeAndPositive: /^-?\d*\.?\d+$/,  

  // for price
  price: /^\d*\.?\d+$/,
  priceWithDecimal: /^\d*\.?\d+$/,
  priceWithDecimalAndNegative: /^-?\d*\.?\d+$/,
  priceWithDecimalAndNegativeAndPositive: /^-?\d*\.?\d+$/,
  priceWithDecimalAndNegativeAndPositiveAndZero: /^-?\d*\.?\d+$/,
  priceWithDecimalAndNegativeAndPositiveAndZeroAndNegative: /^-?\d*\.?\d+$/, 

  // for date
  date: /^\d{4}-\d{2}-\d{2}$/,
  dateWithTime: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
  dateWithTimeAndTimeZone: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \d{2}:\d{2}$/,

  // String 
  name: /^[a-zA-Z\s]{3,}$/, // only letters and spaces. at least 3 characters
  nameWithSpaces: /^[a-zA-Z\s]+$/,
  nameWithSpacesAndNumbers: /^[a-zA-Z\s\d]+$/,
  nameWithSpacesAndNumbersAndSpecialCharacters: /^[a-zA-Z\s\d\W]+$/,
 

};

