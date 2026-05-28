import { Link } from "react-router-dom";

import CartItem from "@/components/cart/CartItem";

import useCartStore from "@/store/cartStore";

function CartPage() {

  const items =
    useCartStore(
      (state) => state.items
    );


  // =====================================================
  // SUBTOTAL
  // =====================================================

  const total =
    items.reduce(

      (sum, item) =>

        sum +

        (
          item.totalPrice ||
          item.price
        )

        *

        item.quantity,

      0

    );


  // =====================================================
  // TOTAL ITEM COUNT
  // =====================================================

  const totalItems =
    items.reduce(

      (sum, item) =>

        sum +

        item.quantity,

      0

    );


  return (

    <div
      className="
        min-h-screen
        bg-neutral-100
        p-4
        pb-32
        space-y-4
      "
    >

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Your Cart
        </h1>

        {

          items.length > 0 && (

            <p
              className="
                text-gray-500
                mt-1
              "
            >

              {totalItems}

              {" "}

              item

              {totalItems > 1
                ? "s"
                : ""}

            </p>

          )

        }

      </div>



      {/* ================================= */}
      {/* EMPTY */}
      {/* ================================= */}

      {

        items.length === 0 && (

          <div
            className="
              bg-white
              rounded-3xl
              p-10
              text-center
              shadow-sm
            "
          >

            <p
              className="
                text-lg
                font-medium
              "
            >
              Cart empty
            </p>

            <p
              className="
                text-sm
                text-gray-500
                mt-2
              "
            >
              Add something delicious ☕
            </p>

          </div>

        )

      }



      {/* ================================= */}
      {/* CART ITEMS */}
      {/* ================================= */}

      {

        items.map(

          (item) => (

            <CartItem

              key={
                item.cartKey
              }

              item={
                item
              }

            />

          )

        )

      }



      {/* ================================= */}
      {/* SUMMARY */}
      {/* ================================= */}

      {

        items.length > 0 && (

          <div
            className="
              bg-white
              rounded-3xl
              p-5
              shadow-sm
            "
          >

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <span
                className="
                  text-gray-600
                "
              >
                Subtotal
              </span>


              <span
                className="
                  font-bold
                  text-xl
                "
              >
                $

                {total.toFixed(
                  2
                )}

              </span>

            </div>

          </div>

        )

      }



      {/* ================================= */}
      {/* CHECKOUT */}
      {/* ================================= */}

      {

        items.length > 0 && (

          <Link

            to="/checkout"

            className="
              block
              w-full
              text-center

              bg-black
              text-white

              rounded-full

              p-4

              font-medium

              shadow-sm
            "
          >

            Checkout

          </Link>

        )

      }

    </div>

  );

}

export default CartPage;