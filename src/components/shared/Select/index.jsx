import { useState } from "react";

import "./styles.scss";

const defaultOptions = [{ value: "###" }];

export default function SelectList({
  setSelectedList,
  selectOptions = defaultOptions,
}) {
  const [selected, setSelected] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectInLIst = (list) => {
    setSelected(list.name);
    setSelectedList(list.id);
  };

  return (
    <div className="select_container" onClick={() => setIsOpen(!isOpen)}>
      <p className="selected_text">{selected ? selected : "Select"}</p>
      <div
        className="select_box"
        // In style 40 is related `select_item` height margin and padding.
        style={{ height: isOpen ? selectOptions.length * 44 : 0 }}
      >
        {selectOptions &&
          selectOptions.map((item, index) => {
            let color = ""
            if (item.id === "Flower") {
              color = "green"
            } else if (item.id === "NonFlower") {
              color = "#e4bd01"
            } else {
              color = "gray"
            }
            if (!item.name) {
              return ""
            }
            return <div key={index}
              style={{
                border: SelectList === index ? "1px solid #fff" : "1px solid transparent",
                borderRadius: 8
              }} className="select_item"
              onClick={() => handleSelectInLIst(item, index)}>
              <p style={{ color: SelectList === index ? "white" : "", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                {item.isDotHide ? "" : <svg fill={color} height={13} width={13} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" viewBox="0 0 31.955 31.955">
                  <g>
                    <path d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3   c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z" />
                    <path d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416   C17.01,24.487,15.067,24.5,13.288,23.896z M8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375   C7.452,17.138,7.426,15.029,8.12,13.122z M28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672   C29.827,17.319,29.78,14.193,28.763,11.333z M11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137   C17.523,1.94,14.328,1.906,11.394,2.883z" />
                    <circle cx="15.979" cy="15.977" r="6.117" />
                  </g>
                </svg>}
                {item.name}
              </p>
            </div>
          })}
      </div>
    </div>
  );
}
