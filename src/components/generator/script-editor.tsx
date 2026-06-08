"use client";

import { useState } from "react";

export function ScriptEditor({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue);
  return <textarea value={value} onChange={(e) => setValue(e.target.value)} className="focus-ring min-h-40 w-full resize-y rounded-xl border border-[#ebe4df] bg-[#fcfaf8] p-4 text-sm leading-7 text-[#404658]" />;
}
