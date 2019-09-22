import keyboard from './CityPicker';
const CityPicker = {
    install (Vue, options) {
        Vue.component('CityPicker', keyboard)
    }
}

export default CityPicker;