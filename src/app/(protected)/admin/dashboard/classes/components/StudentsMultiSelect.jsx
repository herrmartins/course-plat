'use client';
import { useMemo, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

export default function UsersMultiSelect({
  label = 'Usuários',
  inputName = 'users[]',
  users = [],
  defaultSelectedIds = []
}) {
  const mapById = useMemo(
    () => Object.fromEntries(users.map(u => [u._id, u])),
    [users]
  );
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(
    defaultSelectedIds.map(id => mapById[id]).filter(Boolean)
  );

  const filtered = query
    ? users.filter(u => u.fullName.toLowerCase().includes(query.toLowerCase()))
    : users;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
        {label}:
      </label>

      <Combobox value={selected} onChange={setSelected} multiple>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded border
                          border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700
                          text-left focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-8 text-gray-900 dark:text-gray-200 bg-transparent focus:outline-none"
              displayValue={(vals) => vals.map(v => v.fullName).join(', ')}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Selecione ${label.toLowerCase()}…`}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </Combobox.Button>
          </div>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded
                                        border border-gray-200 dark:border-gray-600
                                        bg-white dark:bg-gray-800 shadow-lg">
            {filtered.map((u) => (
              <Combobox.Option
                key={u._id}
                value={u}
                className={({ active }) =>
                  `cursor-pointer select-none px-3 py-2 ${
                    active ? 'bg-indigo-100 dark:bg-indigo-600 dark:text-white' : ''
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center justify-between">
                    <span className="truncate">{u.fullName}</span>
                    {selected && <CheckIcon className="h-4 w-4" />}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>

      {selected.map((s) => (
        <input key={s._id} type="hidden" name={inputName} value={s._id} />
      ))}
    </div>
  );
}
