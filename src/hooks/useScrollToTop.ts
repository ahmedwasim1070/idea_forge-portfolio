// Imports
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Without this a new route keeps the previous page's scroll position, which is
// disorienting on the long legal documents.
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};
