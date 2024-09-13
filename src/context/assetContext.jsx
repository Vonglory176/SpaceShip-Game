import React, { createContext, useContext } from 'react'
import useLoadAssets from '../hooks/loadAssets'

const AssetsContext = createContext()

const AssetsProvider = ({ children }) => {
  const { progress, assets } = useLoadAssets()

  return (
    <AssetsContext.Provider value={{ progress, assets }}>
      {children}
    </AssetsContext.Provider>
  )
}

const useAssetsContext = () => {
  return useContext(AssetsContext)
}

export { AssetsProvider, useAssetsContext }