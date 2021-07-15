import {GeistProvider, CssBaseline} from "@geist-ui/react"
import {useState, useEffect} from "react"
import "../styles/globals.css"
import 'inter-ui/inter.css'
import {Page, Text, Link, Button} from "@geist-ui/react"
import {Github} from "@geist-ui/react-icons"
import {getTheme, savePreferredTheme} from "../lib"
function MyApp({Component, pageProps}) {
    const [themeType, setThemeType] = useState('dark')
    const [display, setDisplay] = useState(false)
    const switchThemes = () => {
        const newTheme = themeType === "dark" ? "light" : "dark"
        setThemeType(newTheme)
        savePreferredTheme(newTheme)
    }
    useEffect(() => {
        setDisplay(true)
        setThemeType(getTheme())
    }, [])

    return (
        <GeistProvider themeType={themeType}>
            <CssBaseline />
            {display ? (
                <Component
                    {...pageProps}
                    themeToggle={switchThemes}
                    currentTheme={themeType}
                />
            ) : (
                <noscript>
                    <Page>
                        <Text h3>
                            You need JavaScript enabled to use this application :/
                        </Text>
                        <Link href="https://github.com/jasonappah/wordcounter">
                            <Button iconRight={<Github />} auto>
                                View source on GitHub
                            </Button>
                        </Link>
                    </Page>
                </noscript>
            )}
        </GeistProvider>
    )
}

export default MyApp
