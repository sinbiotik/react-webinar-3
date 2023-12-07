import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function ProductInfo(props) {
  const cn = bem('ProductInfo');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.product._id)
  }

  return (
    <div className={cn()}>
      <div className={cn('description')}>
        {props.product.description}
      </div>
      <div className={cn('madeIn')}>
        Страна производитель: <strong>{props.product.madeIn?.title}</strong>
      </div>
      <div className={cn('category')}>
        Категория: <strong>{props.product.category?.title}</strong>
      </div>
      <div className={cn('dateCreate')}>
        Год выпуска: {props.product.dateCreate &&
          <strong>{new Date(props.product.dateCreate).getFullYear()}</strong>
        }
      </div>

      <div className={cn('price')}>
        Цена: {props.product.price} ₽
      </div>

      <button
        className={cn('button')}
        onClick={callbacks.onAdd}
      >
        Добавить
      </button>

    </ div>
  )
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    dateCreate: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ProductInfo.defaultProps = {
  onAdd: () => {},
}

export default memo(ProductInfo);