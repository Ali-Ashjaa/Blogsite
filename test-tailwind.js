const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
postcss([tailwindcss()]).process('@import "tailwindcss"; @variant dark (&:where(.dark, .dark *));', { from: undefined }).then(res => console.log("OK")).catch(err => console.log(err.message));
