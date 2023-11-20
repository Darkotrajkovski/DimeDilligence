import {ExpenseCategoryDto, IncomeCategoryDto} from "../generated-sources/openapi";

export const categoryIcons = (isIncome: boolean, category: ExpenseCategoryDto | IncomeCategoryDto) =>
  isIncome ? incomeCategoryIcon(category) : expenseCategoryIcons(category);

export const incomeCategoryIcon = (category: IncomeCategoryDto) => {
  switch (category) {
    case "Salary":
      return 'src/assets/moneyWithCard.svg';
    case "Rent":
      return 'src/assets/house.png';
    default:
      return "src/assets/house.png";
  }
}

export const expenseCategoryIcons = (category: ExpenseCategoryDto) => {
  switch (category) {
    case "Drinks":
      return 'src/assets/drink.png';
    case "Coffee":
      return 'src/assets/coffe.png';
    case "Food":
      return 'src/assets/restaurant.png';
    case "Groceries":
      return 'src/assets/groceries.png';
    case "Travel":
      return 'src/assets/beach.png';
    case "Bills":
      return 'src/assets/bills.png';
    case "Credit":
      return 'src/assets/bank.png';
    case "Shopping":
      return 'src/assets/shopping.png';
    default:
      return "src/assets/house.png";
  }
}

export const getCategoryColor = (isIncome, category) =>
  isIncome ? getIncomeCategoryColor(category) : getExpenseCategoryColor(category);

const getExpenseCategoryColor = (expenseCategory: ExpenseCategoryDto | undefined) => {
  switch (expenseCategory) {
    case "Drinks":
      return '--primary-500';
    case "Coffee":
      return '--orange-800'
    case "Food":
      return '--yellow-500'
    case "Groceries":
      return '--red-500';
    case "Travel":
      return '--cyan-500'
    case "Bills":
      return '--teal-500'
    case "Credit":
      return '--purple-500'
    case "Shopping":
      return '--blue-500'
    default:
      return null;
  }
};

const getIncomeCategoryColor = (category: IncomeCategoryDto | undefined) => {
  switch (category) {
    case "Salary":
      return '--green-500';
    case "Rent":
      return '--orange-500';
    default:
      return null;
  }
};

export const showSuccessMessage = (toastRef, message) => {
  toastRef.current.show({severity: 'success', summary: 'Success', detail: message, life: 3000})
}

export const showErrorMessage = (toastRef, message) => {
  toastRef.current.show({severity:'error', summary: 'Error', detail: message, life: 3000});
}