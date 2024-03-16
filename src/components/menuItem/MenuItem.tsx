import React, { FC, useState } from 'react'
import './styles.scss'
import { useAppDispatch } from '../../hooks/redux-hooks'
import { addToOrder } from '../../store/slices/orderSlice'
import { setIsFoodAdded } from '../../store/slices/menuSlice'
import { useTranslation } from 'react-i18next'
import CartIcon from '../Icons/CartIcon'
import { IFood } from '../../models/models'
import { slicedText } from '../../utils/utils'

interface MenuItemProps {
    item: IFood
}

const MenuItem: FC<MenuItemProps> = ({item}) => {
    const [isAdded, setIsAdded] = useState(item.isAddedToOrder)
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    
    const onAddOrderHandle = () => {
        dispatch(addToOrder({
            ...item,
            count: 1
        }))   
        dispatch(setIsFoodAdded(item.id))
        setIsAdded(true)
    }

  return (
    <div className='menu-item'>
        <div className='menu-item-photo'>
            <img src={item.foodPhoto} alt={item.title}/>
        </div>
        <div className='menu-item-content'>
            <div className='menu-item-info'>
                <div className='menu-item-info-title'>{item.title}</div>
                <div className='menu-item-info-description'>{slicedText(item.description, 30)}</div>
            </div>
            <div className='menu-item-footer'>
                <div className='menu-item-footer-price'>{t("from")} {item.price}₽</div>
                {isAdded ? 
                    <div>{t("added")}</div> 
                    : 
                    <div className='menu-item-footer-btn' onClick={() => onAddOrderHandle()}>{CartIcon()}</div>
                }
            </div>
        </div>
    </div>
  )
}

export default MenuItem