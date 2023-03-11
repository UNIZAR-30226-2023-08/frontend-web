import themes from "../assets/themes.json";

var theme;

export function setTheme(newTheme = "default") {
  theme = themes[newTheme];
  // console.log(`../assets/themes/${newTheme}`)
  // theme = JSON.parse(`../assets/themes/${newTheme}.json`)
  console.log(theme)
}

export function getCardAsset({ value }) {
  console.log(theme[value])
}
