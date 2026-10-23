"use client";

import { useSyncExternalStore } from "react";

// The path the visitor actually asked for, so the 404 shell echoes it back.
export function MissingPath() {
  const path = useSyncExternalStore(
    () => () => {},
    () => window.location.pathname,
    () => "./this-path",
  );
  return <>{path}</>;
}
