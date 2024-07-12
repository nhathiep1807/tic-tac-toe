import Game from "@components/components/Game";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-4">
      <Game />
      <p className="text-center mt-4">
        Wanna try advanced version with more features?
        <br />
        <Link href="/advance" className="text-blue-500 underline">
          Lets find out!
        </Link>
      </p>
    </div>
  );
}
