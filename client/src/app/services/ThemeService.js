import DataStorage from "../helpers/DataStorage";
import { changeTheme } from "../redux/actions";

const ThemeService = (() => {
    const defaultTheme = "purple-theme";

    return {
        init(store) {
            if (DataStorage.getData('theme') === null) {
                this.setThemeToStorage(defaultTheme);
                store.dispatch(changeTheme(defaultTheme));
            }
        },

        getTheme() {
            if (DataStorage.getData('theme') === null) {
                return defaultTheme;
            }

            return DataStorage.getData('theme');
        },

        setThemeToStorage(theme) {
            DataStorage.setData('theme', theme); 
        },
    }
})();

export default ThemeService;

