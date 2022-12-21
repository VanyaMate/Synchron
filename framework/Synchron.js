class Synchron {
    constructor (props)
    {
        this.element = typeof(props.element) === 'string' ? document.querySelector(props.element) : props.element;
        this.elementTextContent = this.element.textContent;
        this.data = {};

        const self = this;
        const propsDataKeys = Object.keys(props.data);
        for (let i = 0; i < propsDataKeys.length; i++) {
            let currentValue = props.data[propsDataKeys[i]];
            Object.defineProperty(this.data, [propsDataKeys[i]], {
                get() {
                    return currentValue;
                },
                set(value) {
                    currentValue = value;
                    self.updateElementText.bind(self)();
                },
                enumerable: true
            });
        }
        this.updateElementText();
    }

    updateElementText ()
    {
        const dataKeys = Object.keys(this.data);
        let changedText = this.elementTextContent;
        for (let i = 0; i < dataKeys.length; i++)
        {
            changedText = changedText.replace(`{{${dataKeys[i]}}}`, this.data[dataKeys[i]]);   
        }
        this.element.textContent = changedText;
    }
}