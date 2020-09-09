import React from "react";
import { CountryCodes } from "../../../constants/CountryCodes";

type CountryType = {
  code: string;
  name: string;
};

type Props = {
  deckCountries: [string];
  selectedCountry: string;
  setCountry: Function;
};

export const SelectCountries = ({
  deckCountries,
  selectedCountry,
  setCountry,
}: Props) => {
  return (
    <div>
      <select
        name="category"
        id="category"
        value={selectedCountry}
        onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
          setCountry(ev.target.value)
        }
      >
        <option value="">All Countries</option>
        {CountryCodes.filter((d: CountryType) =>
          deckCountries.includes(d.code)
        ).map((country: CountryType, i: number) => (
          <option value={country.code} key={`categorylist-${i}`}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};
