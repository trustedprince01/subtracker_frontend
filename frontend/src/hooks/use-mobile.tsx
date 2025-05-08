
import * as React from "react"

// Breakpoints
export const MOBILE_BREAKPOINT = 768
export const TABLET_BREAKPOINT = 1024

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

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
    }
    
    window.addEventListener("resize", handleResize)
    handleResize()
    
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isTablet
}

export function useResponsive() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = React.useMemo(() => !isMobile && !isTablet, [isMobile, isTablet])

  return { isMobile, isTablet, isDesktop }
}
