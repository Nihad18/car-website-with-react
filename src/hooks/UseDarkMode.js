import {useEffect,useState} from 'react'

function useDarkMode () { 
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const colorTheme=theme==='light' ? 'dark' : 'light'
  useEffect(() => {
    const root=window.document.documentElement

    root.classList.add(theme);
    root.classList.remove(colorTheme);
    localStorage.setItem('theme', theme);
  },[setTheme,colorTheme])
    return [setTheme,colorTheme]
}

export default useDarkMode