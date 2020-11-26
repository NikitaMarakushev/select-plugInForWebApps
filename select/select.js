const getTemplate = (data = [], placeHolder, selectedId) => {
    let text = placeHolder ?? 'поле выбора'

    //Шаблон для генерации динамического html-кода плагина
    const items  = data.map(item => {
        let cls = ''
        if (item.id === selectedId) {
            text = item.value
            cls = 'selected'
        }
        return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
        `
    })

    return `
    <div class="select__input" data-type="input">
        <span data-type="value">${text}</span>
        <i class="fa fa-chevron-circle-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
        <ul class="select__list">
            ${items.join('')}
        </ul>
    </div>`
}
export class Select {
    //Конструтор класс селект, созданного в index.js
    constructor(selector, options) {
        //Устанавливаем опции
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId
        this.#render()
        this.#setup()
    }
    #render() {
        const {placeHolder, data} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeHolder, this.selectedId)
    }
    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')
    }
    //Обработчик кликов
    clickHandler(event) {
        const {type} = event.target.dataset
        //В зависимоти от датасета выполняется различная логика, реализуется работа плагина
        if (type === 'input') {
            this.toggle()
        }else if (type === 'item') {
            const id = event.target.dataset.id
            this.select(id)
        }else if(type === 'backdrop') {
            //Закрытие селекта пр нажатии на затемнение
            this.close()
        }
    }
    get isOpen() {
        return this.$el.classList.contains("open")
    }
    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }
    select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        //Callback, отображает в консоли выбранный объект с набором {id:'значение', value: 'текст'}
        this.options.onSelect ? this.options.onSelect(this.current) : null

        this.close()
    }
    toggle() {
        this.isOpen ? this.close() : this.open()
    }
    open() {
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-chevron-circle-down')
        this.$arrow.classList.add('fa-chevron-circle-up')
     }
    //Этот метод закрывает селект
    close () {
        this.$el.classList.remove('open')
        this.$arrow.classList.add('fa-chevron-circle-down')
        this.$arrow.classList.remove('fa-chevron-circle-up')
    }
    //Этот метод уничтожает селект
    destoy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }
}