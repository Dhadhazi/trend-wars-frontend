import React from "react";
import { CategoryList } from "../../../constants/CategoryList";

type CategoryType = {
  number: number;
  name: string;
};

type Props = {
  deckCategories: [number];
  selectedCategory: number;
  setCategory: Function;
};

export const SelectCategories = ({
  deckCategories,
  selectedCategory,
  setCategory,
}: Props) => {
  return (
    <div className="col-md-6">
      <select
        className="form-control form-control-lg"
        name="category"
        id="category"
        value={selectedCategory}
        onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void =>
          setCategory(Number(ev.target.value))
        }
      >
        {CategoryList.filter((d: CategoryType) =>
          deckCategories.includes(d.number)
        ).map((category: CategoryType, i: number) => (
          <option value={category.number} key={`categorylist-${i}`}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
