import React from 'react'
import { NumberPad, DigitalPad, ColorPad } from './Games'
export default [
  {
    message: {
      strings: ["Bienvenue sur la V3 !", "Etape 1"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    onComplete: '/bla/test/etape1',
    game: ColorPad,
    code: [1,2,3,4]
  },
  {
    message: {
      strings: ["Etape 2"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    onComplete: '/bla/rav/etape2',
    game: DigitalPad,
    code: [7,4,1,5,3,6,9]
  },
  {
    message: {
      // strings: ["Excellent...^1000", "Vous avez un cerveau...^1000 surprenant"],
      strings: ["Excellent...^1000", "Etape 3"],
      typeSpeed: 100,
      backSpeed: 0,
    },
    onComplete: '/pire/oula/etape2',
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
