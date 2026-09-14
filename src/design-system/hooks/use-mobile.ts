import * as React from "react"

const MOBILE_BREAKPOINT = 768

/** True below a 768px viewport width, kept in sync via a matchMedia
 * listener. Undefined until the first effect runs (no window on the
 * server), coerced to false for that instant rather than leaking the
 * tri-state out — callers get a plain boolean, always. */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
