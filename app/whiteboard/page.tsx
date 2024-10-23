"use client";
import { Tldraw } from "tldraw";

import "tldraw/tldraw.css";

export default function WhiteBoard() {
	// const router = useRouter();
	// const store = useSyncDemo({ roomId: router.pathname });

	return <div className="mt-20 fixed inset-0"><Tldraw /></div>;
}
