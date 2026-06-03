import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="rounded-3xl bg-white p-8 text-center">
        <div className="mb-4 text-6xl">
          🎉
        </div>

        <h1 className="mb-3 text-3xl font-bold">
          Order Success
        </h1>

        <p className="mb-6 text-muted-foreground">
          Your order has been sent to kitchen
        </p>

        <Link
          to="/"
          className="inline-block rounded-full bg-black px-6 py-3 text-white"
        >
          Back to Menu
        </Link>
      </div>
    </div>
  );
}

export default SuccessPage;