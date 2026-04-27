// next/navigation type declarations are incomplete in this Next.js version.
// The functions exist at runtime — re-export with explicit types.
/* eslint-disable @typescript-eslint/no-explicit-any */
const nav: any = require('next/navigation');

type NavigateOptions = { scroll?: boolean };
type AppRouterInstance = {
  push: (href: string, options?: NavigateOptions) => void;
  replace: (href: string, options?: NavigateOptions) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (href: string) => void;
};

type ReadonlyURLSearchParams = URLSearchParams & { size: number };

export const notFound: () => never = nav.notFound;
export const redirect: (url: string) => never = nav.redirect;
export const useRouter: () => AppRouterInstance = nav.useRouter;
export const usePathname: () => string = nav.usePathname;
export const useSearchParams: () => ReadonlyURLSearchParams = nav.useSearchParams;
