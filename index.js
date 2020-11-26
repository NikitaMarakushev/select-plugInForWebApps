import {Select} from './select/select'
import './select/styles.scss'

const select = new Select('#select', {
    placeHolder: 'Выберите элемент',
    selectedId: '4',
    data: [
        {id: '1', value: 'Значение 1'},
        {id: '2', value: 'Значение 2'},
        {id: '3', value: 'Значение 3'},
        {id: '4', value: 'Значение 4'},
        {id: '5', value: 'Значение 5'},
        {id: '6', value: 'Значение 6'},
    ],
    onSelect(item) {
        console.log('Выбранный элемент', item)
    }
})

window.s = select