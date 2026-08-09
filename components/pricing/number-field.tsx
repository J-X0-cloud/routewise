"use client";

import type { ReactNode } from "react";

import { Input } from "@/components/ui/input";

interface NumberFieldProps {
  id: string;
  label: ReactNode;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Adds a range slider under the input for quick, coarse adjustments. */
  withSlider?: boolean;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  withSlider,
}: NumberFieldProps) {
  const update = (raw: string) => {
    const parsed = Number.parseInt(raw, 10);
    const bounded = Number.isNaN(parsed)
      ? min
      : Math.max(min, max ? Math.min(max, parsed) : parsed);
    onChange(bounded);
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <Input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={(event) => update(event.target.value)}
      />
      {withSlider ? (
        <input
          type="range"
          aria-hidden="true"
          tabIndex={-1}
          min={min}
          max={max}
          value={value}
          onChange={(event) => update(event.target.value)}
          className="mt-2 w-full accent-primary"
        />
      ) : null}
    </div>
  );
}
