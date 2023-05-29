import { createContext } from "react";
import { SelectValues } from "../enum/filter-values.enum";

export const FilterValueContext = createContext<{
  filterValue: keyof typeof SelectValues;
  changeValue: (value: keyof typeof SelectValues) => void;
}>({ filterValue: SelectValues.all, changeValue: () => {} });
