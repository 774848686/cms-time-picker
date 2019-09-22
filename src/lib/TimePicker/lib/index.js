import keyboard from './TimePicker';
const TimePicker = {
    install (Vue, options) {
        Vue.component('TimePicker', keyboard)
    }
}

export default TimePicker;