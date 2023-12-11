import { memo, useCallback, useEffect } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import BasketTool from "../../components/basket-tool";
import Basket from "../HomePage/basket";
import ProductInfo from "../../components/product-info";
import { useParams } from "react-router-dom";

function AboutPage() {
  const store = useStore();
  const {id} = useParams()

  useEffect(() => {
    if (!id) return
    store.actions.product.load(id);
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product
  }));

  const callbacks = {
    // // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const activeModal = useSelector(state => state.modals.name);

  return (
    <PageLayout>

      <Head title={select.product.title}/>

      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ProductInfo product={select.product} onAdd={callbacks.addToBasket}/>

      {activeModal === 'basket' && <Basket/>}

    </PageLayout>
  );
}

export default memo(AboutPage);