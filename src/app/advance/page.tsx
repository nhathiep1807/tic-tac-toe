import AdvancedGame from "@components/components/AdvancedGame";
import Game from "@components/components/Game";
import Link from "next/link";

export default function Advance() {
  return (
    <div className="px-4">
      <AdvancedGame />
      <p className="text-center text-blue-500 underline mt-4">
        <Link href="/">Back to simple version</Link>
      </p>
    </div>
  );
}
