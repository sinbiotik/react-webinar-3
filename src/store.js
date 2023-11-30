import {generateCode} from "./utils";

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
    if (this.state.shoppingCart[code]) {
      this.setState({
        ...this.state,
        shoppingCart: {
          ...this.state.shoppingCart,
          [code]: {
            ...this.state.shoppingCart[code],
            count: this.state.shoppingCart[code].count + 1
          }
        }
      })
    } else {
      this.setState({
        ...this.state,
        shoppingCart: {...this.state.shoppingCart,
          [code]: {
            ...this.state.list.find(item => item.code === code),
            count: 1
          }
        }
      })
    }
  };

  /**
   * Удаление из корзины товаров по коду
   * @param code
   */
  deleteProduct(code) {
    let newObj =  {...this.state.shoppingCart}
    delete newObj[code]
    this.setState({
      ...this.state,
      shoppingCart: newObj
    })
  }
}

export default Store;
