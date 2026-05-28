import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl p-8 text-center">

        <div className="text-6xl mb-4">
          🎉
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Order Success
        </h1>

        <p className="text-muted-foreground mb-6">
          Your order has been sent to kitchen
        </p>

        <Link
          to="/"
          className="
          bg-black
          text-white
          px-6
          py-3
          rounded-full
          inline-block
          "
        >
          Back to Menu
        </Link>

      </div>

    </div>
  );
}

export default SuccessPage;