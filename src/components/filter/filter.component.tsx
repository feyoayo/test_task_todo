import { useContext } from "react";
import { FilterValueContext } from "../../contexts/filter-value.context";
import { SelectValues } from "../../enum/filter-values.enum";

const Filter = () => {
  const { filterValue, changeValue } = useContext(FilterValueContext);

  return (
    <select
      className={"outline-none w-full"}
      value={filterValue}
      onChange={(e) => changeValue(e.target.value as SelectValues)}
    >
      <option value={SelectValues.all}>Show All</option>
      <option value={SelectValues.completed}>Show completed tasks</option>
      <option value={SelectValues.uncompleted}>Show uncompleted tasks</option>
    </select>
  );
};

export default Filter;
