/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";

import "./styles.scss";

// const weightLongList = [
//   { weight: "Light" },
//   { weight: "Medium" },
//   { weight: "Firm" },
// ];

// const weightList = [
//   { weight: "Grams" },
//   { weight: "Ounces" },
//   { weight: "Pounds" },
//   { weight: "Newtons" },
// ];

export default function ScaleTouch3D({ weightListIndex, isKG }) {
  const [error, setError] = useState("");
  const [weightLabelText, setWeightLabelText] = useState("Loading...");
  const [selectedWeightLongIndex, setSelectedWeightLongIndex] = useState(0);

  console.log(isKG)
  useEffect(() => {
    var iOS = ['iPad', 'iPhone', 'iPod', 'iPhone Simulator'].indexOf(navigator.platform) >= 0;
    if (!iOS) {
      setError("Sorry, but this application requires iOS.");
    } else {

    }
    console.log(">>>>")
  }, [])

  var tareForce = 0;
  function tareWeight() {
    tareForce = getCurrent3DTForce();
    updateForce();
  }

  var forceConversionRatios = [320, 400, 480];
  var selected3DTSettingIndex = getStoredSensitivity();

  var weightUnitIndex = getStoredWeightUnitIndex();

  var weightUnitNames = ['g', 'oz', 'lb', 'N']; //["g", "kg"];
  var weightConvertGramsRatios /*Unit*/ = [
    1.0, 0.03527396, 0.00220462, 0.00980665,
  ];

  var touch
  var touches;
  var touchCount = 0;
  function onTouchStart(e) {
    touch = e.touches[0];
    touches = e.touches;
    touchCount = e.touches.length;
    settingPressed(true); //Force close settings if open
    updateForce();
  }
  function onTouchMove(e) {
    touches = e.touches;
    touch = e.touches[0];
    touchCount = e.touches.length;
    updateForce();
  }
  function onTouchForceChange(e) {
    touch = e.touches[0];
    touches = e.touches;
    touchCount = e.touches.length;
    updateForce();
  }
  function onTouchEnded(e) {
    touch = undefined;
    touches = e.touches;
    touchCount = e.touches.length;
    updateForce();
  }

  var confirmNoErrors = false;
  function updateForce() {
    var raw3dtForce = getCurrent3DTForce();
    var current3dtForce = raw3dtForce - tareForce;
    var isMaxForce = current3dtForce === touchCount - tareForce && touchCount !== 0;
    var currentGramsForce = getForceInGrams(current3dtForce);
    var displayedWeight = getDisplayedWeight(currentGramsForce);
    console.log("displayedWeight", displayedWeight, currentGramsForce)

    if (
      (raw3dtForce === 0 || isNaN(raw3dtForce)) &&
      touchCount !== 0 &&
      !confirmNoErrors
    ) {
      setWeightLabelText("No 3D Touch?");
    } else {
      if (touchCount !== 0) {
        confirmNoErrors = true;
      }
      setWeightLabelText((isMaxForce ? "≥" : "") + displayedWeight);
    }
  }

  function getCurrent3DTForce() {
    var totalforce = 0;
    for (var i = 0; i < touchCount; i++) {
      totalforce += touches[i].force;
    }
    return totalforce; //(typeof touch !== 'undefined') ? touch.force : 0;
  }

  function getForceInGrams(scale) {
    return scale * forceConversionRatios[selected3DTSettingIndex];
    //Returns scale from 0-1 multiplied by the force conversion
  }
  function getDisplayedWeight(grams) {
    var conversionRatio = weightConvertGramsRatios[weightUnitIndex];

    var finalWeight = grams * conversionRatio;

    var inaccuracyRatio = Math.round(Math.min(Math.pow(2, Math.round(Math.floor(Math.abs(grams) / 100))), 4));

    var decimalPointPrecision = 2;
    console.log(finalWeight, grams, inaccuracyRatio, conversionRatio, weightUnitIndex)
    if (!isKG) {
      finalWeight = Math.round(finalWeight / 5.0 / inaccuracyRatio) * 5.0 * inaccuracyRatio;
      decimalPointPrecision = 0;
    } else { //if (weightUnitNames[weightUnitIndex] === "kg") {
      finalWeight = finalWeight / 1000
      decimalPointPrecision = 3;

      // finalWeight = (Math.round((finalWeight * 5.0) / inaccuracyRatio) / 5.0) * inaccuracyRatio;
      // decimalPointPrecision = Math.max(0, 2 - inaccuracyRatio);
    }


    // if (weightUnitNames[weightUnitIndex] === "g") {
    //   finalWeight = Math.round(finalWeight / 5.0 / inaccuracyRatio) * 5.0 * inaccuracyRatio;
    //   decimalPointPrecision = 0;
    // } else if (weightUnitNames[weightUnitIndex] === "kg") {
    //   finalWeight = (Math.round((finalWeight * 5.0) / inaccuracyRatio) / 5.0) * inaccuracyRatio;
    //   decimalPointPrecision = Math.max(0, 2 - inaccuracyRatio);
    // }

    return (
      finalWeight.toFixed(decimalPointPrecision) + (isKG ? " kg" : " gm")//   weightUnitNames[weightUnitIndex]
    );
  }

  function settingPressed(forceClose) {
    if (
      document.getElementById("controls").style.display === "inline" ||
      forceClose
    ) {
      document.getElementById("controls").style.display = "none";
    } else {
      document.getElementById("controls").style.display = "inline";
    }
  }

  //Cookie management
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  //Storage and retrieval
  function getStoredWeightUnitIndex() {
    var data = ""//getCookie("SelectedWeightUnitIndex");
    if (data !== "") {
      return Number(data);
    } else {
      return 0;
    }
  }

  function getStoredSensitivity() {
    var data = ""//getCookie("Selected3DTSensitivity");
    if (data !== "") {
      return Number(data);
    } else {
      return 1;
    }
  }

  // function Sensitivity3dSelector(e) {
  //   const value = e.target.value;
  //   selected3DTSettingIndex = 0;
  //   for (let i = 0; i < weightLongList.length; i++) {
  //     if (weightLongList[i].weight === value) {
  //       selected3DTSettingIndex = i;
  //       setSelectedWeightLongIndex(i);
  //     }
  //   }
  //   setCookie("Selected3DTSensitivity", selected3DTSettingIndex, 365);
  //   updateForce();
  // }

  console.log(weightUnitIndex)
  function WeightUnitSelector() {
    weightUnitIndex = weightListIndex;
    // setCookie("SelectedWeightUnitIndex", weightUnitIndex, 365);
    updateForce();
  }

  useEffect(() => {
    WeightUnitSelector();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightListIndex, isKG]);

  console.log(selectedWeightLongIndex)
  return (
    <div id="view">
      {/* <div id="navigationBar">
        <div id="title">
          <b>Digital Scale+</b>
        </div>
        <div id="setting" onClick={() => settingPressed()}>
          <img src={scaleSettings} height="32px" width="32px"></img>
        </div>
      </div> */}

      <div
        id="weightMeasurementArea"
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnded}
        onTouchStart={onTouchStart}
        onTouchForceChange={onTouchForceChange} />

      <div id="weightLabelBox">
        <div></div>
        <div id="weightLabel">
          {weightLabelText}
        </div>
        <div className="tare-btn" onClick={tareWeight} onTouchStart={tareWeight}>TARE</div>
      </div>

      {error && <div style={{ textAlign: "center", color: "red" }}>{error}</div>}

      {/* <div id="controls">
        <div className="settingLabel">Weight Unit</div>
        <select
          id="WeightUnitSelector"
          style={{ left: 0 }}
          onChange={WeightUnitSelector}
        >
          {weightList.map(({ weight }, index) => (
            <option key={index} defaultValue={index}>
              {weight}
            </option>
          ))}
        </select>

        <div className="settingLabel">3D Touch Sensitivity</div>
        <select
          id="Sensitivity3dSelector"
          style={{ right: 0 }}
          onChange={Sensitivity3dSelector}
        >
          {weightLongList.map(({ weight }, index) => (
            <option key={index} defaultValue={index}>
              {weight}
            </option>
          ))}
        </select>
      </div> */}

      <div className="empty-boxes">
        <div className="empty-box">Ad Space</div>
        <div className="empty-box">Ad Space</div>
        <div className="empty-box">Ad Space</div>
      </div>
    </div>
  );
}
