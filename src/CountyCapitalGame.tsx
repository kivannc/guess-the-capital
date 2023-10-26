import { useState } from "react";

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};
function CountryCapitalGame({ data }: { data: Record<string, string> }) {
  const countries = Object.keys(data);
  const capitals = Object.values(data);

  const [options, setOptions] = useState<Option[]>(
    [...countries, ...capitals]
      .sort(() => Math.random() - 0.5)
      .map((value) => ({
        value,
        state: "DEFAULT",
      }))
  );
  const [selected, setSelected] = useState<Option>();

  const isGameOver = options.length === 0;

  if (isGameOver) {
    return <h1>Congratulations !!</h1>;
  }
  return (
    <>
      {options.map((option) => (
        <button
          className={
            option.state === "SELECTED"
              ? "selected"
              : option.state === "WRONG"
              ? "wrong"
              : ""
          }
          onClick={() => {
            if (!selected) {
              setSelected(option);
              setOptions(
                options.map((opt) => ({
                  ...opt,
                  state: opt === option ? "SELECTED" : "DEFAULT",
                }))
              );
            } else {
              if (
                selected.value === data[option.value] ||
                data[selected.value] === option.value
              ) {
                setOptions(
                  options
                    .filter(
                      (opt) =>
                        !(
                          opt.value === selected.value ||
                          opt.value === option.value
                        )
                    )
                    .map((opt) => ({
                      ...opt,
                      state: "DEFAULT",
                    }))
                );
                setSelected(undefined);
              } else {
                setOptions(
                  options.map((opt) => ({
                    ...opt,
                    state: opt.value === option.value ? "WRONG" : opt.state,
                  }))
                );
              }
            }
          }}
        >
          {option.value}
        </button>
      ))}
    </>
  );
}

export default CountryCapitalGame;
