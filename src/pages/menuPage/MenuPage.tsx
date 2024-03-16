import MenuItem from '../../components/menuItem/MenuItem'
import Loader from '../../components/loader/Loader'
import { useTranslation } from 'react-i18next'
import { useFetchFoodQuery } from '../../store/foodApi'
import { IFood } from '../../models/models'
import './styles.scss'

const MenuPage = () => {
  const {data = [], isLoading} = useFetchFoodQuery(5)
  const {t} = useTranslation()

  if (isLoading) return <Loader />

  return (
    <div className='delivery-menu'>
        <h2 className='delivery-menu-title'>{t("menu")}</h2>
        <div className='delivery-menu-list'>
          {data?.map((item: IFood) => (
            <MenuItem key={item.id} item={{...item, isAddedToOrder: false}}/>
          ))}
        </div>
    </div>
  )
}

export default MenuPage