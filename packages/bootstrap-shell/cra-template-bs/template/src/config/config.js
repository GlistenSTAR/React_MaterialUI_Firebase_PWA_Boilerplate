import { lazy } from 'react'
import routes from './routes'
import parseLanguages from 'base-shell/lib/utils/locale'
import locales from './locales'
import React from 'react'
import menuItems from './menuItems'

const Loading = () => <div>Loading...</div>

const config = {
  containers: {
    LayoutContainer: lazy(() =>
      import('bootstrap-shell/lib/containers/LayoutContainer/LayoutContainer')
    ),
  },
  components: {
    Loading,
  },
  auth: {
    signInURL: '/signin',
  },
  pwa: {
    useiOSPWAPrompt: true,
    iOSPWAPromptProps: {},
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    onError: (e) => {
      //console.warn(e)
      return
    },
  },
  menu: {
    width: 240,
    initialMobileMenuOpen: false,
    MenuRight: lazy(() => import('../components/Menu/MenuRight')),
    menuItems,
  },
  theme: {},
  pages: {
    // The LandingPage is completely separeted from the App and is not under the LayoutContainer
    LandingPage: lazy(() => import('../pages/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
