import { useState } from "react";

import "./styles.scss";

const defaultOptions = [{ value: "###" }];

export default function SelectList({
  setSelectedList,
  selectOptions = defaultOptions,
}) {
  const [selected, setSelected] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const handleSelectInLIst = (list, index) => {
    const value = list.value;
    const valueIndex = index;

    setSelected(value);
    setSelectedList(list);
    setSelectedIndex(valueIndex);
  };

  return (
    <div className="select_container" onClick={() => setIsOpen(!isOpen)}>
      <p className="selected_text">{selected ? selected : "Select"}</p>
      <div
        className="select_box"
        // In style 40 is related `select_item` height margin and padding.
        style={{ height: isOpen ? selectOptions.length * 40 : 0 }}
      >
        {selectOptions &&
          selectOptions.map((item, index) => (
            <div
              key={index}
              style={{
                background: selectedIndex === index ? "blue" : "",
              }}
              className="select_item"
              onClick={() => handleSelectInLIst(item, index)}
            >
              <p style={{ color: selectedIndex === index ? "white" : "" }}>
                {item.value}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
