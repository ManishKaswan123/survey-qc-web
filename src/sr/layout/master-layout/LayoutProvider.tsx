import {FC, createContext, useContext, useState, useEffect} from 'react'
import {useLoadScript} from '@react-google-maps/api'
import {DefaultLayoutConfig} from './DefaultLayoutConfig'
import {useActions} from 'sr/utils/helpers/useActions'
import {
  getEmptyCssClasses,
  getEmptyCSSVariables,
  getEmptyHTMLAttributes,
  LayoutSetup,
} from './LayoutSetup'

import {
  ILayout,
  ILayoutCSSVariables,
  ILayoutCSSClasses,
  ILayoutHTMLAttributes,
} from './LayoutModels'
import {WithChildren} from 'sr/helpers'

export interface LayoutContextModel {
  config: ILayout
  classes: ILayoutCSSClasses
  attributes: ILayoutHTMLAttributes
  cssVariables: ILayoutCSSVariables
  setLayout: (config: LayoutSetup) => void
}

const LayoutContext = createContext<LayoutContextModel>({
  config: DefaultLayoutConfig,
  classes: getEmptyCssClasses(),
  attributes: getEmptyHTMLAttributes(),
  cssVariables: getEmptyCSSVariables(),
  setLayout: (config: LayoutSetup) => {},
})

const enableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'flex')
  }
}

const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none')
  }
}

const LayoutProvider: FC<WithChildren> = ({children}) => {
  const [config, setConfig] = useState(LayoutSetup.config)
  const [classes, setClasses] = useState(LayoutSetup.classes)
  const [attributes, setAttributes] = useState(LayoutSetup.attributes)
  const [cssVariables, setCSSVariables] = useState(LayoutSetup.cssVariables)
  const setLayout = (_themeConfig: Partial<ILayout>) => {
    enableSplashScreen()
    const bodyClasses = Array.from(document.body.classList)
    bodyClasses.forEach((cl) => document.body.classList.remove(cl))
    LayoutSetup.updatePartialConfig(_themeConfig)
    setConfig(Object.assign({}, LayoutSetup.config))
    setClasses(LayoutSetup.classes)
    setAttributes(LayoutSetup.attributes)
    setCSSVariables(LayoutSetup.cssVariables)
    setTimeout(() => {
      disableSplashScreen()
    }, 500)
  }
  const value: LayoutContextModel = {
    config,
    classes,
    attributes,
    cssVariables,
    setLayout,
  }

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    libraries: ['drawing'],
  })
  
  const {setGoogleMapData} = useActions()

  useEffect(() => {
    if(isLoaded){
      setGoogleMapData(isLoaded)
    }
  }, [isLoaded])
  
  useEffect(() => {
    disableSplashScreen()
  }, [])

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

export {LayoutContext, LayoutProvider}

export function useLayout() {
  return useContext(LayoutContext)
}
