import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Order, Product, ProductState } from '../../types/type'
type AdminState ={
  productItems: Product[],
  error: null | string,
  isLoading: boolean,
  orderList: Order[],
  productID: number | null 
  isEditForm:boolean
}
const initialState: AdminState = {
  productItems: [],
  error: null,
  isLoading: true,
  orderList: [],
  productID:null,
  isEditForm: false

}

export const adminSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProductsData: (state, action: PayloadAction<Product[]>) => {
      state.productItems = action.payload
      state.isLoading = false
    },
    addProduct: (state, action: { payload: { product: Product }}) => {
      state.productItems = [action.payload.product, ...state.productItems]
      state.isLoading = false
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.productItems.filter((product) => product.id !== action.payload.productId)
      state.productItems = filteredItems
    },
    openEditProductForm: (state, action:PayloadAction<number> )=>{
      state.productID = action.payload
      state.isEditForm = true 
    },
    closeEditForm: (state)=>{
      state.isEditForm = false 
    },
    editProduct: (state, action: PayloadAction<{ editedProductId: number | null, product: Product }>)=> {
      const { editedProductId, product } = action.payload;
      const productIndex = state.productItems.findIndex((p) => p.id === editedProductId);
      if (productIndex !== -1) {
        state.productItems[productIndex] = {
          ...state.productItems[productIndex],
          ...product,
        };
      }

    },
    getOrderData: (state, action: PayloadAction<Order[]>)=>{
      state.orderList = action.payload
    },
    getError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

export default adminSlice.reducer
export const adminSliceAction = adminSlice.actions
