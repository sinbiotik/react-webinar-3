import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from '@bem-react/classname'

function Item(props) {

  const callbacks = {
    handleClick: (e) => {
      e.stopPropagation();
      props.handleClick(props.item.code);
    }
  }
  const cn = bem('Item');

  let priceMargin = ''
  if(props.sumGoods) {
    if(props.sumGoods >= 1000000) {
      priceMargin = 'Item-price-margin-xl'
    } else if (props.sumGoods >= 100000) {
      priceMargin = 'Item-price-margin-l'
    } else if (props.sumGoods >= 10000) {
      priceMargin = 'Item-price-margin-m'
    } else if (props.sumGoods >= 1000 ) {
      priceMargin = 'Item-price-margin-s'
    } else if (props.sumGoods >= 100 ) {
      priceMargin = 'Item-price-margin-xs'
    }
  } else {
    priceMargin = ''
  }

  return (
    <div
      className={ cn() }
    >
      <div className={cn('code text')}>{props.item.code}</div>
      <div className={cn('title text')}>
        {props.item.title}
      </div>
      <div
        className={
          `${cn('price text price')} ${priceMargin}`
        }
      >
        {new Intl.NumberFormat('ru-RU').format(props.item.price)}
      </div>

      {props.item.count && <div
        className={cn('count text')}
      >
        {props.item.count} шт
      </div>}

      <div className={cn('actions btn')}>
        <button
          onClick={callbacks.handleClick}
        >
          {props.buttonName}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  handleClick: PropTypes.func,
  buttonName: PropTypes.node,
  sumGoods: PropTypes.node,
};

Item.defaultProps = {
  handleClick: () => {
  },
}

export default React.memo(Item);
