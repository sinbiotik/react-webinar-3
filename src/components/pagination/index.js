import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Pagination(props) {
  const cn = bem('Pagination');

  function createPaginationPages(arr, totalCount, currentPage) {
    if (totalCount > 3) {
      if (currentPage > 2) {
        for(let i = currentPage - 1; i <= currentPage + 1; i++) {
          arr.push(i)
          if(i === totalCount) break
        }
        arr.unshift(1, null)
      } else {
        for( let i = 1; i <=3; i++) {
          arr.push(i)
          if(i === totalCount) break
        }
      }

      if(currentPage < totalCount - 1) {
        arr.push(null, totalCount)
      }

    } else {
      for ( let i = 1; i <= totalCount; i++) {
        arr.push(i)
      }
    }
  }

  const pages = []
  createPaginationPages(pages, props.totalCount, props.currentPage)

  return (
    <div className={cn()}>
      { pages.map((page, index) =>
        <div
          key={index}
          className={`
            ${cn('page')}
            ${props.currentPage === page ? 'current-page' : ''}
            ${page === null ? 'disable-click' : ''}
          `}
          onClick={(e) => {
            props.onSelectPage(page)
          }}
        >
          {page ? page : '...'}
        </div>)
      }
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalCount: PropTypes.number,
  onSelectPage: PropTypes.func
};

Pagination.defaultProps = {
  onSelectPage: () => {}
}

export default memo(Pagination);