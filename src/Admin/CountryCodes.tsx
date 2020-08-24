export function countryStringMaker(list: Array<string>) {
  if (list[0] === "" || list.length === 0) return "All around the world";
  const countries = CountryCodes.filter((c) => list.includes(c.code));
  let countryString = "";
  for (let i = 0; i < countries.length; i++) {
    countryString += countries[i].name;
    if (i !== countries.length - 1) countryString += +", ";
  }
  return countryString;
}

export const CountryCodes = [
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "EE", name: "Estonia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IT", name: "Italy" },
  { code: "ID", name: "Indonesia" },
  { code: "IE", name: "Ireland" },
  { code: "LV", name: "Latvia" },
  { code: "MC", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LI", name: "Luxembourg" },
  { code: "MT", name: "Malta" },
  { code: "MX", name: "Mexico" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "TH", name: "Thailand" },
  { code: "TR", name: "Turkey" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States of America" },
];
