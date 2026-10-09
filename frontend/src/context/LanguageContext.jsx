import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mk_lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('mk_lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'so' : 'en'))
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    return { lang: 'en', setLang: () => {}, toggleLang: () => {} }
  }
  return context
}
