import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      currentPage: 1,
      limit: 10,
      totalCount: 0
    }
  }

  /**
   * Выбор страницы с товарами
   * @param page Страница с товарами
  */

  setPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page,
    }, 'Переключение страницы с товарами')
  }

  async load() {
    const limit = this.getState().limit
    const skip = (this.getState().currentPage - 1) * 10     

    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      totalCount:  Math.ceil(json.result.count / limit),
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
