import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: { items: [] },
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload
      );

      console.log(index);
      let newBasket = [...state.items];

      index !== -1
        ? newBasket.splice(index, 1)
        : console.warn(
            `Cant remove product (id: ${action.payload}) as its not in basket`
          );

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 5.55);

export default basketSlice.reducer;
