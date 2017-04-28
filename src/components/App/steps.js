import React from 'react'
import { NumberPad, DigitalPad, ColorPad } from './Games'
export default [
  {
    message: {
      strings: ["3"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    game: ColorPad,
    code: [1,2,3,4]
  },
  {
    message: {
      strings: ["VERSION 2 !"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    game: DigitalPad,
    code: [7,4,1,5,3,6,9]
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
