import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { title, subtitle } from "@/components/primitives";
import { Board, Chat } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        {/* <span className={title()}>Welcome&nbsp;</span>
        <span className={title({ color: "violet" })}>Folks&nbsp;</span>
        <br /> */}
        <span className={title()}>
          <span className={title({ color: "violet" })}>CollabX</span> present a wide range of tools to increase your productivity
        </span>
        <div className={subtitle({ class: "mt-4" })}>What we offer</div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={`/whiteboard`}
        >
          <Board size={20} />
          Board
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={`/`}
        >
          <Chat size={20} />
          Messanger
        </Link>
      </div>
    </section>
  );
}
