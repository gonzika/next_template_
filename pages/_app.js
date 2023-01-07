import '../styles/globals.css'
import Layout from '../components/layout'
import { SessionProvider } from "next-auth/react"
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import enLocale from 'date-fns/locale/en-US';
import ukLocale from 'date-fns/locale/uk';
import State from '../components/state';

const version = 1
if (typeof window === 'undefined') {
  const dbConnect = require('../dataBase/dbConnect').default
  dbConnect()
}

const localeMap = {
  en: enLocale,
  ua: ukLocale,
}

const emotionCache = createCache({ key: 'css', prepend: true })

export default function MyApp({ Component, ...pageProps }) {
  const [darkTheme, set_darkTheme] = useState(false)
  const router = useRouter()
  const { locale } = router

  let theme = responsiveFontSizes(createTheme({
    palette: {
      mode: darkTheme ? 'dark' : 'light',
      action: {
        hover: darkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)'
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      }
    },
    
  }))

  const themeWithLocale = useMemo(() => createTheme(theme, localeMap[locale]), [locale, theme])

  function setCssVariables() {
    if (typeof window === 'undefined') return

    let headerHeight = document.querySelector('header').getBoundingClientRect().height
    document.documentElement.style.setProperty('--headerHeight', headerHeight+'px');
    document.documentElement.style.setProperty('--actionHover', State.context.theme.palette.action.hover);
  };

  useMemo(() => {
    State.context.locale = localeMap[locale]
    State.context.theme = theme
    setCssVariables()
  }, [locale, theme])


  useEffect(() => {
    let app_version = window.localStorage.getItem('app_version')
    if (app_version && app_version != version) {
      window.localStorage.clear()
      window.sessionStorage.clear()
      window.localStorage.setItem('app_version', version)
      window.location.reload()
    } else if (!app_version) window.localStorage.setItem('app_version', version)

    changeTheme(set_darkTheme)
    State.changeTheme = () => changeTheme(set_darkTheme)

    window.addEventListener('resize', setCssVariables);
    window.addEventListener('orientationchange', setCssVariables);
    setCssVariables()

    const showSpinner = () => {
      if (window.showSpinner) window.showSpinner(true)
    }
    const hideSpinner = () => {
      if (window.showSpinner) window.showSpinner(false)
    }

    router.events.on('routeChangeStart', showSpinner)
    router.events.on('routeChangeComplete', hideSpinner)

    return () => {
      router.events.off('routeChangeStart', showSpinner)
      router.events.off('routeChangeComplete', hideSpinner)

      window.removeEventListener('resize', setCssVariables);
      window.removeEventListener('orientationchange', setCssVariables);
    }
  }, [])

  
  

  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={themeWithLocale}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeMap[locale]}>
            <CssBaseline enableColorScheme/>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}


function changeTheme(set_darkTheme) {
  let localTheme = window.localStorage.getItem('darktheme')
  if (!localTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    window.localStorage.setItem('darktheme', true)
    localTheme = true
  }

  if (localTheme === true || localTheme === 'true') {
    if (localTheme !== 'true') window.localStorage.setItem('darktheme', true)
    set_darkTheme(true)
  } else {
    if (localTheme !== 'false') window.localStorage.setItem('darktheme', false)
    set_darkTheme(false)
  }
}

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
    }
  }
}