import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window scroll to (0, 0) on every route change.
 * Render this once inside <BrowserRouter> — Layout.jsx is the right place.
 * It renders nothing visible.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}