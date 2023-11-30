import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from '@bem-react/classname'

function List({ list, handleClick, buttonName, sumGoods, }) {

  const cn = bem('List');

  return (
    <div className={`${cn()} ${sumGoods ? 'List-margin' : ''}`}>
      {
        list.map(item =>
          <div key={item.code} className={cn('item')}>
            <Item
              item={item}
              handleClick={handleClick}
              buttonName={buttonName}
              sumGoods={sumGoods}
            />
          </div>
        )
      }
      {Boolean(sumGoods) &&
        <div className={cn('total')}>
          <div className={cn('total-title text bold')}>Итого</div>
          <div className={cn('total-text text bold price')}>
            {new Intl.NumberFormat('ru-RU').format(sumGoods)}
          </div>
        </div>
      }
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  handleClick: PropTypes.func,
  buttonName: PropTypes.node,
  sumGoods: PropTypes.node,
};

List.defaultProps = {
  handleClick: () => {
  },
}

export default React.memo(List);
