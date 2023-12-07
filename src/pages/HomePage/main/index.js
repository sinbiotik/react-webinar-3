import {memo, useCallback, useEffect} from 'react';
import Item from "../../../components/item";
import PageLayout from "../../../components/page-layout";
import Head from "../../../components/head";
import BasketTool from "../../../components/basket-tool";
import List from "../../../components/list";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";
import Pagination from '../../../components/pagination';

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    totalCount: state.catalog.totalCount
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.currentPage]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение страницы с товарами
    onSetPage: useCallback((page) => store.actions.catalog.setPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        currentPage={select.currentPage}
        totalCount={select.totalCount}
        onSelectPage={callbacks.onSetPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
