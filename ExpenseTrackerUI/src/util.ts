import {ExpenseCategoryDto} from "../generated-sources/openapi";

export const categoryIcons = (category: ExpenseCategoryDto) => {
  switch (category) {
    case "Drinks":
      return drinksIcon;
    case "Groceries":
      return groceriesIcon;
    default:
      return groceriesIcon;
  }
}
const drinksIcon = 'https://cdn3d.iconscout.com/3d/premium/thumb/welcome-drink-6751737-5559769.png';
const groceriesIcon = 'https://cdn-icons-png.flaticon.com/512/1261/1261163.png';

export const showSuccessMessage = (toastRef, message) => {
  toastRef.current.show({severity: 'success', summary: 'Success', detail: message, life: 3000})
}

export const showErrorMessage = (toastRef, message) => {
  toastRef.current.show({severity:'error', summary: 'Error', detail: message, life: 3000});
}