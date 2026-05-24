"use client"

import { useState } from "react"

interface RepeatableTextListProps {
  label: string
  hint?: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
  minRows?: number
}

export function RepeatableTextList({
  label,
  hint,
  items,
  onChange,
  placeholder,
  minRows = 1,
}: RepeatableTextListProps) {
  function update(idx: number, value: string) {
    const next = [...items]
    next[idx] = value
    onChange(next)
  }

  function remove(idx: number) {
    onChange(items.filter((_, i) => i !== idx))
  }

  function add() {
    onChange([...items, ""])
  }

  function moveUp(idx: number) {
    if (idx === 0) return
    const next = [...items]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  function moveDown(idx: number) {
    if (idx === items.length - 1) return
    const next = [...items]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChange(next)
  }

  return (
    <div>
      <label className="mono-pill block mb-2">{label}</label>
      {hint && <p className="text-xs text-ink-muted mb-2 leading-relaxed">{hint}</p>}

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-start">
            <span className="font-mono text-[10px] text-ink-muted pt-3 w-6 text-right">
              {String(idx + 1).padStart(2, "0")}.
            </span>
            <input
              type="text"
              value={item}
              onChange={(e) => update(idx, e.target.value)}
              className="flex-1 px-3 py-2 border border-line-strong text-sm"
              placeholder={placeholder}
              style={{ borderRadius: 2 }}
            />
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                aria-label="Move up"
                className="px-1.5 text-xs text-ink-muted hover:text-accent disabled:opacity-30"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveDown(idx)}
                disabled={idx === items.length - 1}
                aria-label="Move down"
                className="px-1.5 text-xs text-ink-muted hover:text-accent disabled:opacity-30"
              >
                ▼
              </button>
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              disabled={items.length <= minRows}
              className="px-3 py-2 text-xs text-ink-muted hover:text-red-600 disabled:opacity-30"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 text-xs font-mono uppercase tracking-widest text-accent hover:underline"
      >
        + Add row
      </button>
    </div>
  )
}

interface RepeatablePair {
  title?: string
  description?: string
  question?: string
  answer?: string
}

interface RepeatableObjectListProps {
  label: string
  hint?: string
  items: RepeatablePair[]
  onChange: (items: RepeatablePair[]) => void
  field1Key: "title" | "question"
  field1Label: string
  field2Key: "description" | "answer"
  field2Label: string
  field2Long?: boolean
}

export function RepeatableObjectList({
  label,
  hint,
  items,
  onChange,
  field1Key,
  field1Label,
  field2Key,
  field2Label,
  field2Long = true,
}: RepeatableObjectListProps) {
  function update(idx: number, key: string, value: string) {
    const next = [...items]
    next[idx] = { ...next[idx], [key]: value }
    onChange(next)
  }

  function remove(idx: number) {
    onChange(items.filter((_, i) => i !== idx))
  }

  function add() {
    onChange([...items, { [field1Key]: "", [field2Key]: "" }])
  }

  function moveUp(idx: number) {
    if (idx === 0) return
    const next = [...items]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  function moveDown(idx: number) {
    if (idx === items.length - 1) return
    const next = [...items]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    onChange(next)
  }

  return (
    <div>
      <label className="mono-pill block mb-2">{label}</label>
      {hint && <p className="text-xs text-ink-muted mb-2 leading-relaxed">{hint}</p>}

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="border border-line bg-bg-2 p-4 relative">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                Item #{idx + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="px-2 py-0.5 text-xs text-ink-muted hover:text-accent disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(idx)}
                  disabled={idx === items.length - 1}
                  className="px-2 py-0.5 text-xs text-ink-muted hover:text-accent disabled:opacity-30"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="px-2 py-0.5 text-xs text-ink-muted hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block mb-1">
                  {field1Label}
                </label>
                <input
                  type="text"
                  value={(item as any)[field1Key] ?? ""}
                  onChange={(e) => update(idx, field1Key, e.target.value)}
                  className="w-full px-3 py-2 border border-line-strong text-sm bg-bg"
                  style={{ borderRadius: 2 }}
                />
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block mb-1">
                  {field2Label}
                </label>
                {field2Long ? (
                  <textarea
                    value={(item as any)[field2Key] ?? ""}
                    onChange={(e) => update(idx, field2Key, e.target.value)}
                    className="w-full px-3 py-2 border border-line-strong text-sm bg-bg min-h-[80px]"
                    style={{ borderRadius: 2 }}
                  />
                ) : (
                  <input
                    type="text"
                    value={(item as any)[field2Key] ?? ""}
                    onChange={(e) => update(idx, field2Key, e.target.value)}
                    className="w-full px-3 py-2 border border-line-strong text-sm bg-bg"
                    style={{ borderRadius: 2 }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 text-xs font-mono uppercase tracking-widest text-accent hover:underline"
      >
        + Add item
      </button>
    </div>
  )
}
