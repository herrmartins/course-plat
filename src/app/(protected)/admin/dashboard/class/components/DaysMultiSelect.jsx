"use client";
import { useState, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { DAYS } from "@/app/lib/utils/days";

export default function DaysMultiSelect({ defaultSelectedDays = [], onRemove }) {
  const [query, setQuery] = useState("");

  const [selected, setSelected] = useState(
    DAYS.filter((d) => defaultSelectedDays.includes(d))
  );

  useEffect(() => {
    const newSelected = DAYS.filter((d) => defaultSelectedDays.includes(d));
    setSelected(newSelected);
  }, [defaultSelectedDays]);

  const filtered =
    query === ""
      ? DAYS
      : DAYS.filter((day) =>
          day.toLowerCase().includes(query.toLowerCase())
        );

  const handleRemove = (day) => {
    setSelected((prev) => prev.filter((d) => d !== day));
    onRemove && onRemove(day);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        Dias da Semana:
      </label>

      <Combobox
        multiple
        value={selected}
        onChange={setSelected}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <div
            className="relative max-w-lg cursor-default overflow-hidden rounded border
                       border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                       text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="flex flex-wrap gap-1 p-2">
              {selected.map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs
                             text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-200"
                >
                  {d}
                  <button
                    type="button"
                    className="rounded p-0.5 hover:bg-indigo-200 dark:hover:bg-indigo-800"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleRemove(d)}
                    aria-label={`Remover ${d}`}
                  >
                    <CheckIcon className="h-3 w-3 rotate-45" />
                  </button>
                </span>
              ))}
            </div>

            <ComboboxInput
              aria-label="days"
              className="w-full border-none py-2 pl-3 pr-8 text-gray-900 dark:text-gray-200 bg-transparent focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Selecione os dias..."
            />

            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor={{ to: "bottom", gap: "0.5rem" }}
            className="border mt-1 max-h-60 overflow-auto rounded
                       border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg"
          >
            {filtered.map((day) => (
              <ComboboxOption
                key={day}
                value={day}
                className="data-[focus]:bg-indigo-100 data-[focus]:dark:bg-indigo-600
                           data-[focus]:dark:text-white cursor-pointer select-none px-3 py-2"
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span>{day}</span>
                    {selected && <CheckIcon className="ml-1 h-4 w-4" />}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>

      {selected.map((day) => (
        <input key={day} type="hidden" name="days" value={day} />
      ))}
    </div>
  );
}
