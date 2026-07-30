import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { MoreVertical, SquarePen, Trash } from 'lucide-react'

const DropDownMenu = ({ job, openMenu, setOpenMenu, onEdit, onDelete }) => {

    const menuRef = useRef(null);
    const isOpen = openMenu === job._id;

    useEffect(() => {

      if(!isOpen) return;

      const handleClickOutside = (event) => {

      if(menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[isOpen, setOpenMenu]);

  const handleAction = (actionCallback) => {
    setOpenMenu(null);   // Close menu first
    actionCallback();   // Execute action
  };

  return (
  <div className="relative" ref={menuRef}>
    <button
    type='button'
    onClick={(e) => {
      e.stopPropagation();
      setOpenMenu(isOpen ? null : job._id)
      }}
      className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition"
      aria-expanded={isOpen}
      aria-haspopup='menu'
    >
      <MoreVertical size={22} />
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 min-w-[100px] bg-white rounded-xl shadow-lg border p-1 z-20">
        <button
        type='button'
        onClick={(e) => {
        e.stopPropagation();
        handleAction(onEdit)
      }}
        className="w-full flex items-center gap-2 text-left px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
        >
          <SquarePen size={16} />
            Edit
        </button>

        <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          handleAction(onDelete)
        }}
        className="w-full flex items-center gap-2 text-left px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <Trash size={16} />
          Delete
        </button>
      </div>
    )}
  </div>
);
}

export default DropDownMenu;
