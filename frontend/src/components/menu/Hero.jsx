import { Star } from "lucide-react";

function Hero() {
  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24"
        alt="cafe"
        className="
        h-56
        w-full
        object-cover
        "
      />

      <div
        className="
        absolute
        inset-0
        bg-black/20
        "
      />

      <div
        className="
        bg-white
        rounded-t-3xl
        -mt-6
        relative
        p-5
        space-y-3
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          My Coffee House
        </h1>

        <div
          className="
          flex
          items-center
          gap-4
          text-sm
          text-muted-foreground
          "
        >
          <div
            className="
            flex
            items-center
            gap-1
            "
          >
            <Star size={16} />
            4.9
          </div>

          <span>25 min</span>

          <span>Open</span>
        </div>

        <p
          className="
          text-sm
          text-muted-foreground
          "
        >
          Today's Special ☕ Fresh Coffee + Pastry
        </p>
      </div>
    </div>
  );
}

export default Hero;
