
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FaHome, FaPlusCircle, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

const IconMap = {
  'home': FaHome,
  'addType': FaPlusCircle,
  'addClass': FaChalkboardTeacher,
  'manageUsers': FaUsers,
};

function SidebarNavItem({ href, children, iconName }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  const IconComponent = iconName ? IconMap[iconName] : null;

  return (
    <li className="mb-2">
      <Link
        href={href}
        className={`flex items-center p-3 rounded-lg text-lg font-medium transition-all duration-200 group
          ${isActive
            ? 'bg-indigo-600 text-white shadow-lg transform translate-x-1 border-l-4 border-indigo-300 dark:border-indigo-100'
            : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
          }
        `}
      >
        {IconComponent && (
          <IconComponent
            className={`w-6 h-6 mr-3
              ${isActive ? 'text-white' : 'text-indigo-500 group-hover:text-indigo-700 dark:text-indigo-400 dark:group-hover:text-indigo-200'}
            `}
          />
        )}
        <span className={`text-base font-normal leading-normal tracking-wide z-10 ${isActive ? 'font-semibold text-white' : 'text-gray-300 dark:text-gray-300'}`}> {/* Ajustes na cor e peso da fonte */}
          {children}
        </span>
      </Link>
    </li>
  );
}

export default SidebarNavItem;