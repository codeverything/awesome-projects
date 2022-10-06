import Notification from './Notification.js'
let Current_Element;
import './color-scheme.min.js'


function Palette_Color_Generate() {
    let COLOR_PALETTE = document.getElementById("COLOR_PALETTE")
    COLOR_PALETTE.innerHTML = ''

    for (let i = 1; i <= 5; i++) {
        let scheme = new ColorScheme;
        scheme.from_hue(Math.random() * 1000)
            .scheme('triade')
            .variation('soft');

        let cColors = scheme.colors();
        let generate_ColorPalette = '#' + cColors[i - 1]

        let li = document.createElement('li')
        let spanColor = document.createElement('span')
        spanColor.className = 'color'
        spanColor.style.setProperty('--color', generate_ColorPalette)

        let spanText = document.createElement('span')
        spanText.className = 'text'
        spanText.innerText = generate_ColorPalette

        let ColorCode_Input = document.createElement('input')
        ColorCode_Input.name = 'ColorCode'
        ColorCode_Input.value = generate_ColorPalette

        li.appendChild(spanColor)
        li.appendChild(spanText)
        li.appendChild(ColorCode_Input)
        COLOR_PALETTE.appendChild(li)

        li.addEventListener('mouseover', (e) => {
            Current_Element = e.target.parentNode
        })

        li.addEventListener('click', (e) => {
            let PaletteColor = e.target.parentNode.querySelector('input[name="ColorCode"]')
            PaletteColor.select();
            document.execCommand('copy');
            Notification('Color <b>' + PaletteColor.value + '</b> copied to your clipoard', "success")
        })

    }

}

window.addEventListener('keypress', (e) => {
    if (e.keyCode === 32) {
        Palette_Color_Generate()
    } else if (e.keyCode === 99 && Current_Element) {
        let PaletteColor = Current_Element.querySelector('input[name="ColorCode"]')
        PaletteColor.select();
        document.execCommand('copy');
        Notification('Color <b>' + PaletteColor.value + '</b> copied to your clipoard', "success")
    }

    e.preventDefault()
})


export default Palette_Color_Generate