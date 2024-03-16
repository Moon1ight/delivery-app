import React, { useEffect, useState } from 'react'
import { getCreatedOrder } from '../../utils/firebaseFunctions'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './styles.scss'

type OrderType = {
  0: string,
  1: number
}

const CreatedOrderPage = () => {
    const param = useParams()
    const orderId = param?.id

    const {t} = useTranslation()
    
    const [order, setOrder] = useState<any>([])
    

    useEffect(() => {
        getCreatedOrder(orderId).then(res => {
          setOrder(res)
        })
    },[])

    const getPaymentType = () => {
      switch (order?.payment) {
        case "online":
          return t("online")

        case "card":
          return t("card")
          
        case "cash":
         return t("cash") 
      
        default:
          break;
      }
    }

  if (!order) return <div>Заказ не найден!</div>

  return (
    <div className='delivery-created-order'>
      <div className='delivery-created-order-header'>
        <div>{t("orderCreated")}!</div>
        <div className='delivery-created-order-id'>{order?.orderId}</div>
      </div>
      <div className='delivery-created-order-menu'>
        <h2>{t("order")}: </h2>
        {order?.orders?.map((order: OrderType) => (
          <div key={order[0]} className='delivery-created-order-item'>
            <div className='delivery-created-order-item-title'>{order[0]}</div>
            <div className='delivery-created-order-item-count'>{order[1]}шт.</div>
          </div>
        ))}
      </div>
      <div className='delivery-created-order-info'>
        <div className='delivery-created-order-info-field'>
          {t("deliveryAddress")} <span>{order?.deliveryAddress ? order.deliveryAddress : "-"}</span>
        </div>
        <div className='delivery-created-order-info-field'>
          {t("paymentType")} <span>{getPaymentType()}</span>
        </div>
        <div className='delivery-created-order-info-field title'>
          {t("total")} <span>{order?.totalPrice}₽</span>
        </div>
      </div>
    </div>
  )
}

export default CreatedOrderPage