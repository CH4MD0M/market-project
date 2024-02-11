const addCommasToNumber = (inputNumber: number | string) =>
  inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default addCommasToNumber;
