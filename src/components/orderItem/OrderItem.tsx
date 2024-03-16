import React from 'react'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { addOneMore, removeFromOrder, removeOneMore } from '../../store/slices/orderSlice'
import './styles.scss'
import { setIsFoodAdded } from '../../store/slices/menuSlice'

const OrderItem = ({order}: any) => {
    const dispatch = useAppDispatch() 

    const removeOneMoreHandler = (id: string) => {
      if (order.count > 1) {
        dispatch(removeOneMore(id))
      } else {
        dispatch(removeFromOrder(id))
        dispatch(setIsFoodAdded(id))
      }
    }

  return (
    <div className='delivery-order-item'>
        <div className='delivery-order-item-content'>
          <div>
            <img alt="order" src={order.foodPhoto}/>
          </div>
          <div>
            <div className='delivery-order-item-content-title'>
              {order.title}
            </div>
            <div className='delivery-order-item-content-price'>
              {order.price * order.count}₽
            </div>
          </div>
        </div>
        <div className='delivery-order-item-count'>
          <button className='delivery-order-item-count-btn' onClick={() => removeOneMoreHandler(order.id)}>-</button>
          <div className='delivery-order-item-count-display'>{order.count}</div>
          <button className='delivery-order-item-count-btn' onClick={() => dispatch(addOneMore(order.id))}>+</button>
        </div>
    </div>
  )
}

export default OrderItem