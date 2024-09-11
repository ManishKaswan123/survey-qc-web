// src/hooks/useActions.ts
import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUserData} from '../../redux/action/userActions'
import {fetchBusinessType} from 'sr/redux/action/businessTypeActions'
import {fetchCategoryType} from 'sr/redux/action/categoryActions'
import {fetchOrderData} from 'sr/redux/action/orderAction'
import {fetchTransactionData} from 'sr/redux/action/transactionAction'
// import {fetchProduct} from '../api/fetchProduct'
import {fetchProductData} from 'sr/redux/action/productActions'
import {fetchSubCatData} from 'sr/redux/action/subCatActions'
import {fetch86Action} from 'sr/redux/action/eightySixAction'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(
    {
      fetchUserData,
      fetchBusinessType,
      fetchCategoryType,
      fetchOrderData,
      fetchTransactionData,
      fetchProductData,
      fetchSubCatData,
      fetch86Action,
    },
    dispatch
  )
}
