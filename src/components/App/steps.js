import React from 'react'
import { NumberPad } from './Games'
export default [
  {
    message: {
      strings: ["Bonjour...^1000", "Voyons comment vous vous débrouillez."],
      typeSpeed: 100,
      backSpeed: 0,
    },
    game: NumberPad,
    code: [1,2,3,4]
  },
  {
    message: {
      strings: ["Bien bien !^1000", "et avec celui ci ?"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    game: NumberPad,
    code: [2,3,4,5]
  },
  {
    message: {
      strings: ["Excellent...^1000", "Vous avez un cerveau...^1000 surprenant"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    game: NumberPad,
    code: [3,4,5,6]
  },
  {
    message: {
      strings: ["#@â~@#@#@~...^1000", "\\(@_@)/"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    game:() => <div>FIN</div>,
    code: []
  },
]
