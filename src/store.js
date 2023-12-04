import {countGoodsFunc, sumGoodsFunc} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление в корзину товаров по коду
   * @param code
   */
  addBasket(code) {
    const index = this.state.shoppingCart.findIndex(item => item.code === code)
    const shoppingCart = [...this.state.shoppingCart]
    if (index >= 0) {
      shoppingCart[index] = {
        ...this.state.shoppingCart[index],
        count: this.state.shoppingCart[index].count + 1
      }

    } else {
      shoppingCart.push({
        ...this.state.list.find(item => item.code === code),
        count: 1
      })
    }

    this.setState({
      ...this.state,
      shoppingCart,
      count: countGoodsFunc(shoppingCart),
      total: sumGoodsFunc(shoppingCart)
    })
  };

  /**
   * Удаление из корзины товаров по коду
   * @param code
   */
  deleteProduct(code) {
    const shoppingCart = [...this.state.shoppingCart]
    const index = this.state.shoppingCart.findIndex(item => item.code === code)
    shoppingCart.splice(index, 1)

    this.setState({
      ...this.state,
      shoppingCart,
      count: countGoodsFunc(shoppingCart),
      total: sumGoodsFunc(shoppingCart)
    })
  }
}

export default Store;
