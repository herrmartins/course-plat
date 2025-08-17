"use client";
import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

export default function UsersMultiSelect({
  label = "Usuários",
  inputName = "users[]",
  users = [],
  defaultSelectedIds = [],
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    defaultSelectedIds
      .map((id) => users.find((us) => us._id === id))
      .filter(Boolean)
  );

  const filtered =
    query === ""
      ? users
      : users.filter((u) =>
          u.fullName.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        {label}:
      </label>
      <Combobox
        multiple
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <div
            className="relative max-w-200 cursor-default overflow-hidden rounded border
                          border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                          text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {selected.map((u) => (
              <span
                key={u._id}
                className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200"
              >
                {u.fullName}
                <button
                  type="button"
                  className="rounded p-0.5 hover:bg-indigo-200 dark:hover:bg-indigo-800"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => remove(u._id)}
                  aria-label={`Remover ${u.fullName}`}
                >
                  <CheckIcon className="h-3 w-3" />
                </button>
              </span>
            ))}
            <ComboboxInput
              aria-label={label}
              displayValue={(user) => user?.fullName}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full border-none py-2 pl-3 pr-8 text-gray-900 dark:text-gray-200 bg-transparent focus:outline-none"
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </ComboboxButton>
          </div>
          <ComboboxOptions
            anchor={{ to: "bottom", gap: "0.5rem" }}
            className="border mt-1 max-h-60 w-100 overflow-auto rounded
                       border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg"
          >
            {filtered.map((u) => (
              <ComboboxOption
                key={u._id}
                value={u}
                className="data-[focus]:bg-indigo-100 data-[focus]:dark:bg-indigo-600 data-[focus]:dark:text-white cursor-pointer select-none px-3 py-2"
              >
                {({ selected }) => (
                  <div className="data-focus flex items-center justify-between">
                    <span className="truncate">{u.fullName}</span>
                    {selected && <CheckIcon className="h-4 w-4" />}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
      {selected.map((s) => (
        <input key={s._id} type="hidden" name={inputName} value={s._id} />
      ))}
    </div>
  );
}
