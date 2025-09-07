'use client';
import Link from 'next/link';
import { Logo } from '../Logo';
import { useUserStore } from 'src/store/userStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { BiSearch, BiX } from 'react-icons/bi';
import { FullLogo } from '../Logo/FullLogoWithText';
import { Drawer } from '../Drawer';
import { UserProfile } from '../UserProfile';
import { extractEnums } from 'src/utils/extractEnums';
import LoadingSpinner from 'src/components/Loading';
import { useQueryClient } from '@tanstack/react-query';
import LoginModal from '../LoginModal';
import { Modal } from 'src/components/Modal';

export const CommonNav = () => {
  return (
    <Suspense fallback={<div />}>
      <Common />
    </Suspense>
  );
};

export const Common = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const query = useSearchParams();
  const queryString = query.get('query') ?? '';
  const [searchQuery, setSearchQuery] = useState(queryString);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    // if user logged and in a landing page  redirect to /app
    if (user.userId && !window.location.pathname.includes('/app')) {
      // router.push('/app');
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      // first reset all the filters
      queryClient.refetchQueries({ queryKey: ['searchListedAiTools'], type: 'all' });
      // refresh the page after 1 second
      if (window.location.pathname.includes('/search')) {
        setTimeout(() => {
          // only if it's in search page

          window.location.reload();
        }, 100);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
    router.push('/search');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
        searchInputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hideRightside = isSearchFocused && isMobile;

  return (
    <div>
      <div
        className="relative top-0 z-[999] flex h-[70px] w-full  flex-col  justify-center bg-white px-3 align-middle  shadow-sm md:h-[70px] md:px-[30px]"
        id="common-nav">
        <div className="flex w-full justify-between  ">
          <div className=" flex flex-shrink-0 ">
            <div className="relative ">
              <div className="hidden md:block">
                <FullLogo />
              </div>
              <div className="block md:hidden">
                <Logo />
              </div>
            </div>
            <div className=" mt-2 hidden flex-col justify-center md:flex"></div>
          </div>

          {/* Enhanced Search Bar - Center */}
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="relative w-full max-w-lg">
              <form onSubmit={handleSearch} className="relative">
                <div
                  className={`relative transition-all duration-300 ${
                    isSearchFocused ? 'scale-105' : 'scale-100'
                  }`}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for tools, Ai tools for programmer, and more..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className="w-full rounded-full border-2 border-gray-200 bg-gray-50 px-5 py-3 pl-12 pr-12 text-sm font-medium text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-500 hover:shadow-md focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
                  />

                  {/* Search Icon */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <BiSearch className="h-5 w-5 text-gray-400" />
                  </div>

                  {/* Clear Button */}
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      type="button"
                      onClick={clearSearch}
                      aria-label="Clear Search"
                      className="absolute right-14 top-3  -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600">
                      <BiX className="h-4 w-4" />
                    </motion.button>
                  )}

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={!searchQuery.trim()}
                    aria-label="Search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary p-2.5 text-white shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary">
                    <BiSearch className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {!hideRightside && (
            <div className=" flex flex-shrink-0 flex-col justify-center ">
              <div className="flex flex-row-reverse gap-2 md:gap-4">
                <div className="flex flex-row-reverse gap-3">
                  <div className=" flex gap-3 ">
                    {
                      <div className="flex flex-col justify-center">
                        <div className="bg-gray-50o hover:bg-gray-1000 flex items-center gap-2 rounded-lg  py-2 transition md:gap-4">
                          <Link href={user.userId ? '/app/my-tools' : '/submit-ai-tool-free'}>
                            <button className="flex items-center gap-2 rounded-md bg-primary  py-1 text-base font-semibold text-white shadow transition hover:bg-primary/90 md:text-lg">
                              <svg
                                className="mr-1 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              {isMobile ? 'Tools' : 'List My AI Tool'}
                            </button>
                          </Link>
                        </div>
                      </div>
                    }
                    {user?.userId && (
                      <div className=" mt-1 ">
                        <div className="left-0 top-[70px]  lg:hidden ">
                          <Drawer />
                        </div>
                      </div>
                    )}
                    {user.userId && (
                      <div className="ml-2 mt-1">
                        <UserProfile />
                      </div>
                    )}
                  </div>
                </div>
                {!user.userId && (
                  <>
                    <div className="relative flex gap-1 md:gap-2">
                      <LoginModal label="Login" />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
