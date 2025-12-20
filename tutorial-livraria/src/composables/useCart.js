import { reactive, ref } from 'vue';

const cart = reactive({
  items: [],
  total: 0,
});

  function addToCart(book) {
    const existingBook = cart.items.find(item => item.id === book.id);

    if (existingBook) {
      existingBook.quantity++;
    } else {
      cart.items.push({ ...book, quantity: 1 });
    }

    cart.total += book.price;
  }

  function incrementBook(book) {
    const existingBook = cart.items.find(item => item.id === book.id);
    if (existingBook) {
      existingBook.quantity++;
      cart.total += book.price;
    }
  }

  function decrementBook(book) {
    const existingBook = cart.items.find(item => item.id === book.id);
    if (!existingBook) return;

    if (existingBook.quantity === 1) {
      cart.items = cart.items.filter(item => item.id !== book.id);
    } else {
      existingBook.quantity--;
    }

    cart.total -= book.price;
  } 
  function zerarCarrinho() {
        cart.items.splice(0);
        cart.total = 0;
  }
  const showCart = ref(false);

export function useCart() {
  return {
    cart,
    addToCart,
    incrementBook,
    decrementBook,
    zerarCarrinho,
    showCart
  };
}
