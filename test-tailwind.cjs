const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
postcss([tailwindcss()]).process('@import "tailwindcss"; @custom-variant dark (&:where(.dark, .dark *));', { from: undefined }).then(res => console.log("CUSTOM_VARIANT_OK")).catch(err => console.log(err.message));
