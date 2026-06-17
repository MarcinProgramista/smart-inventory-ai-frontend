import NeonSelect from "../ui/selects/NeonSelect";

export default function EntityFilter({
  items = [],
  value,
  onChange,
  allLabel = "ALL",
  width = "200px",
}) {
  const options = [
    { value: "", label: allLabel },
    ...items.map((i) => ({
      value: i.id,
      label: i.name,
    })),
  ];

  return (
    <NeonSelect
      options={options}
      value={value}
      onChange={onChange}
      width={width}
      size="sm"
    />
  );
}
