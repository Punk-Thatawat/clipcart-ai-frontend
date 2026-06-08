"use client";

import { useMemo, useSyncExternalStore } from "react";
import { mockProducts } from "@/data/mock-products";

const storageKey = "clipcart-saved-products";
const updateEvent = "clipcart-saved-products-updated";
const defaultSavedIds = Array.from(
  new Set([
    ...mockProducts.filter((product) => product.saved).map((product) => product.id),
    mockProducts[3]?.id,
    mockProducts[4]?.id,
    mockProducts[7]?.id,
  ].filter(Boolean) as string[]),
);
const defaultSnapshot = JSON.stringify(defaultSavedIds);

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(updateEvent, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(updateEvent, onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(storageKey) ?? defaultSnapshot;
}

function updateSavedIds(savedIds: string[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(savedIds));
  window.dispatchEvent(new Event(updateEvent));
}

export function useSavedProducts() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => defaultSnapshot);
  const savedIds = useMemo(() => {
    try {
      return JSON.parse(snapshot) as string[];
    } catch {
      return defaultSavedIds;
    }
  }, [snapshot]);

  const toggleSaved = (id: string) => {
    updateSavedIds(
      savedIds.includes(id)
        ? savedIds.filter((savedId) => savedId !== id)
        : [...savedIds, id],
    );
  };

  const removeSaved = (id: string) => {
    updateSavedIds(savedIds.filter((savedId) => savedId !== id));
  };

  return { savedIds, toggleSaved, removeSaved };
}
