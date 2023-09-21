import {useColorScheme} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {
    Common,
    Fonts,
    Gutters,
    Images,
    Layout,
    themes,
    DefaultVariables,
} from '../theme';
import {ThemeState} from '@/store/theme';
import {
    ThemeVariables,
    Theme,
    ThemeNavigationTheme,
    ThemeNavigationColors,
} from 'types/theme';

export default function () {
    // Get the scheme device
    const colorScheme = useColorScheme();

    // Get current theme from the store
    const currentTheme = useSelector(
        (state: { theme: ThemeState }) => state.theme.theme,
    );
    const isDark = useSelector(
        (state: { theme: ThemeState }) => state.theme.darkMode,
    );
    const darkMode = isDark === null ? colorScheme === 'dark' : isDark;
    let variables = {};
    let partialTheme = {};
    let darkVariables = {};
    let partialDarkTheme = {};

    if (currentTheme !== 'default') {
        const {
            Variables,
            // @ts-ignore to prevent multiple themes handling
            ...themeConfig
        } = themes[currentTheme] || {};

        variables = Variables;
        partialTheme = themeConfig || {};
    }

    if (darkMode) {
        const {Variables, ...darkThemeConfig} =
        themes[`${currentTheme}_dark` as keyof typeof themes] || {};

        darkVariables = Variables;
        partialDarkTheme = darkThemeConfig;
    }

    const themeVariables = mergeVariables(variables, darkVariables);

    const fonts = Fonts(themeVariables);
    const gutters = Gutters(themeVariables);
    const images = Images(themeVariables);
    const layout = Layout(themeVariables);
    const common = Common({
        ...themeVariables,
        Layout: Layout(themeVariables),
        Gutters: Gutters(themeVariables),
        Fonts: Fonts(themeVariables),
        Images: Images(themeVariables),
    });

    // Build the default theme
    const baseTheme: Theme<typeof fonts,
        typeof gutters,
        typeof images,
        typeof layout,
        typeof common> = {
        Fonts: fonts,
        Gutters: gutters,
        Images: images,
        Layout: layout,
        Common: common,
        ...themeVariables,
    };

    // Merge and return the current Theme
    return buildTheme(
        darkMode,
        baseTheme,
        formatTheme(themeVariables, partialTheme || {}),
        formatTheme(themeVariables, partialDarkTheme || {}),
    );
}

/**
 * Generate Theme with theme variables
 */
const formatTheme = <F, G, I, L, C>(
    variables: ThemeVariables,
    theme: Partial<Theme<F, G, I, L, C>>,
) => {
    return Object.entries(theme).reduce((acc, [name, generate]) => {
        return {
            ...acc,
            [name]: (generate as any)(variables),
        };
    }, theme);
};

/**
 * Merge all variables for building the theme
 * baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeVariables = (
    themeConfig: Partial<ThemeVariables>,
    darkThemeConfig: Partial<ThemeVariables>,
) => {
    return Object.entries(DefaultVariables).reduce((acc, [group, vars]) => {
        const theme:
            | Record<keyof typeof DefaultVariables, typeof vars>
            | undefined = (themeConfig as any)[group];
        const darkTheme:
            | Record<keyof typeof DefaultVariables, typeof vars>
            | undefined = (darkThemeConfig as any)[group];

        return {
            ...acc,
            [group]: {
                ...vars,
                ...(theme || {}),
                ...(darkTheme || {}),
            },
        };
    }, DefaultVariables);
};

/**
 * Provide all the theme exposed with useTheme()
 */
const buildTheme = <F, G, I, L, C>(
    darkMode: boolean,
    baseTheme: Theme<{ textTiny: { color: any; fontSize: any }; textSmall: { color: any; fontSize: any }; textError: { color: any }; textRight: { textAlign: string }; titleRegular: { color: any; fontSize: number; fontWeight: string }; titleSmall: { color: any; fontSize: number; fontWeight: string }; textUppercase: { textTransform: string }; textSuccess: { color: any }; textJustify: { textAlign: string }; textLobster: { fontFamily: string; fontWeight: string }; textBold: { fontWeight: string }; textPrimary: { color: any }; titleLarge: { color: any; fontSize: number; fontWeight: string }; textCenter: { textAlign: string }; textLarge: { color: any; fontSize: any }; textLeft: { textAlign: string }; textRegular: { color: any; fontSize: any }; textLight: { color: any } }, Gutters, { sparkles: { bottomLeft: any; top: any; bottomRight: any; bottom: any; topLeft: any; topRight: any; right: any }; logo: any; icons: { send: any; colors: any; translate: any } }, {
        bottom0: { bottom: number }; col: { flexDirection: string }; alignItemsStretch: { alignItems: string }; mirror: { transform: { scaleX: number }[] }; selfStretch: { alignSelf: string }; justifyContentBetween: { justifyContent: string }; rowHCenter: { alignItems: string; flexDirection: string }; colVCenter: { alignItems: string; flexDirection: string }; rowVCenter: { flexDirection: string; justifyContent: string }; alignItemsCenter: { alignItems: string }; top0: { top: number }; scrollSpaceBetween: { flexGrow: number; justifyContent: string }; alignItemsEnd: { alignItems: string }; fullHeight: { height: string }; right0: { right: number }; justifyContentEnd: { justifyContent: string }; colHCenter: { flexDirection: string; justifyContent: string }; colReverse: { flexDirection: string }; halfWidth: { width: string }; row: { flexDirection: string }; alignItemsStart: { alignItems: string }; fullWidth: { width: string }; fullSize: { width: string; height: string }; colCenter: { alignItems: string; flexDirection: string; justifyContent: string }; center: { alignItems: string; justifyContent: string }; left0: { left: number }; rotate90: { transform: { rotate: string }[] }; fill: { flex: number }; scrollSpaceAround: { flexGrow: number; justifyContent: string }; rowCenter: { alignItems: string; flexDirection: string; justifyContent: string }; rotate90Inverse: { transform: { rotate: string }[] }; absolute: { position: string }; justifyContentAround: { justifyContent: string }; rowReverse: { flexDirection: string }; justifyContentCenter: { justifyContent: string }; relative: { position: string }
    }, { button: { outline: any; rounded: any; outlineRounded: any; circle: { backgroundColor: any; alignItems: string; borderRadius: number; color: string; width: number; fill: string; justifyContent: string; height: number }; base: any }; textInput: { backgroundColor: any; color: any; borderRadius: number; paddingStart: number; height: number }; backgroundReset: { backgroundColor: any }; backgroundPrimary: { backgroundColor: any } }>,
    themeConfig: [string, any],
    darkThemeConfig: [string, any],
) => {
    return {
        ...mergeTheme(baseTheme, themeConfig, darkThemeConfig),
        darkMode,
        NavigationTheme: mergeNavigationTheme(
            darkMode ? DarkTheme : DefaultTheme,
            baseTheme.NavigationColors,
        ),
    };
};

/**
 * Merge theme from baseTheme <- currentTheme <- currentDarkTheme
 */
const mergeTheme = <F, G, I, L, C>(
    baseTheme: Theme<F, G, I, L, C>,
    theme: Partial<Theme<F, G, I, L, C>>,
    darkTheme: Partial<Theme<F, G, I, L, C>>,
) =>
    Object.entries(baseTheme).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: {
                ...((value as any) || {}),
                ...((theme as any)[key] || {}),
                ...((darkTheme as any)[key] || {}),
            },
        }),
        baseTheme,
    ) as typeof baseTheme;

/**
 * Merge the React Navigation Theme
 *
 * @param reactNavigationTheme
 * @param overrideColors
 * @return {{colors}}
 */
const mergeNavigationTheme = (
    reactNavigationTheme: ThemeNavigationTheme,
    overrideColors: Partial<ThemeNavigationColors>,
) => ({
    ...reactNavigationTheme,
    colors: {
        ...reactNavigationTheme.colors,
        ...overrideColors,
    },
});
