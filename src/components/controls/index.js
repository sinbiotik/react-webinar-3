import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname'
import { plural } from "../../utils";

function Controls({ handleClick, buttonName, sumGoods, countGoods, }) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('text text')}>В корзине: </div>

      { countGoods ?
        <div className={cn('text text bold price')}>
          {countGoods ?
            `
              ${countGoods}
              ${plural(
                countGoods,
                {one: 'товар', few: 'товара', many: 'товаров'}
              )}
               / ${new Intl.NumberFormat('ru-RU').format(sumGoods)}
            `
            :
            `пусто`
          }
        </div>
        :
        <div className={cn('text text bold')}>
          пусто
        </div>
      }

      <div className={cn('btn btn')}>
        <button
          onClick={() => handleClick()}
        >
          {buttonName}
        </button>
      </div>

    </div>
  )
}

Controls.propTypes = {
  buttonName: PropTypes.node,
  handleClick: PropTypes.func,
  sumGoods: PropTypes.node,
  countGoods: PropTypes.node,
};

Controls.defaultProps = {
  handleClick: () => {}
}

export default React.memo(Controls);
