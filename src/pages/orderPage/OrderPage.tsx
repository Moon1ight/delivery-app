import React, {  useState } from 'react'
import { useAppSelector } from '../../hooks/redux-hooks'
import Button from '../../components/button/Button'
import OrderItem from '../../components/orderItem/OrderItem'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../utils/firebaseFunctions'
import Select from '../../components/select/Select'
import { useTranslation } from 'react-i18next'
import './styles.scss'

const DELIVERY_PRICE = 200

const OrderPage = () => {
  const navigate = useNavigate()
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [paymentType, setPaymentType] = useState("online")
  const orders = useAppSelector(state => state.orders.orders)
  const userId = useAppSelector(state => state.user.id)
  const {t} = useTranslation()


  const getTotalPrice = () => {
    let total = 0
    orders?.forEach(order => {
      total += order.count * order.price
    })
    return total
  }

  let orderSum =  getTotalPrice() + DELIVERY_PRICE
  const orderId = userId?.substring(0, 5) + "-" + new Date().toLocaleTimeString().replaceAll(":", "")

  const createOrderHandler = () => {
    const orderData = orders.map(order => ({0: order.title, 1: order.count}))
    const newOrder = {
      userId,
      orderId,
      totalPrice: orderSum,
      orders: orderData,
      deliveryAddress,
      payment: paymentType
    }
    createOrder(newOrder)
    navigate(`/order/${orderId}`)
  }

  const paymentOptions = [
    {title: t("online"), value: "online"},
    {title: t("card"), value: "card"},
    {title: t("cash"), value: "cash"},
  ]

  return (
    <div className='delivery-order'>
      <h2 className='delivery-order-title'>
        {t("yourOrder")}
      </h2>
      <div className='delivery-order-list'>
        {orders.length === 0 && <div>{t("noOrders")}</div>}
        {orders?.map(order => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
      <div className='delivery-order-user'>
        <div className='delivery-order-user-data'>
          <div className='delivery-order-user-title'>
            {t("deliveryAddress")}
          </div>
        <input value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} placeholder={t("deliveryAddress")}/>
        </div>
        <div className='delivery-order-user-data'>
          <div className='delivery-order-user-title'>
            {t("paymentType")}
          </div>
          <Select options={paymentOptions} onChangeHandler={setPaymentType} />
        </div>
      </div>
      <div className='delivery-order-info'>
          <div className='delivery-order-info-text'>
            {t("order")}: <span>{getTotalPrice()}₽</span>
          </div>
          <div className='delivery-order-info-text'>
            {t("delivery")}: <span>{DELIVERY_PRICE}₽</span>
          </div>
          <hr/>
          <div className='delivery-order-info-text-result'>
            {t("total")}: <span>{orderSum}₽</span>
          </div>
          <Button title={t("validePurchase")} onClick={() => createOrderHandler()}/>
      </div>
    </div>
  )
}

export default OrderPage