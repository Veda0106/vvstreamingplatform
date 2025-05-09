'use client'
import { SearchIcon } from "lucide-react";
export const SearchInput = () => {
  return (
    <form className="flex w-full max-w-[720px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 pr-12 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {/* You can later add a clear (X) button here */}
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );
};