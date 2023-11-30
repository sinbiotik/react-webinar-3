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
          `${cn('price text price')} ${props.sumGoods ? 'Item-price-margin' : ''}`
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
