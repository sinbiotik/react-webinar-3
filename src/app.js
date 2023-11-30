import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import { countGoodsFunc, sumGoodsFunc } from './utils';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [modal, setModal] = useState(false)

  const list = store.getState().list;
  const shoppingCart = Object.values(store.getState().shoppingCart);

  function onOpen() {
    setModal(prev => !prev);
  }

  const callbacks = {
    onAddBasket: useCallback((code) => {
      store.addBasket(code);
    }, [store]),

    onDeleteProduct: useCallback((code) => {
      store.deleteProduct(code);
    }, [store]),
  }

  return (
    <PageLayout>
      <Head
        title='Магазин'
        buttonName={null}
      />

      <Controls
        buttonName='Перейти'
        handleClick={onOpen}
        sumGoods={sumGoodsFunc(shoppingCart)}
        countGoods={countGoodsFunc(shoppingCart)}
      />

      <List
        list={list}
        handleClick={callbacks.onAddBasket}
        buttonName='Добавить'
      />

      {modal &&
        <Modal>
          <Head
            title='Корзина'
            buttonName='Закрыть'
            handleClick={onOpen}
          />

          <List
            list={shoppingCart}
            buttonName='Удалить'
            handleClick={callbacks.onDeleteProduct}
            sumGoods={sumGoodsFunc(shoppingCart)}
          />
        </Modal>
      }

    </PageLayout>
  );
}

export default App;
