import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import AppLogo from "../../components/shared/AppLogo";
import Button from "../../components/shared/Button";
import Hamburger from "../../components/shared/hamburger";
import ScaleTouch3D from "../../components/shared/ScaleTouch3D";
import { getAuthorization, getToken, logout, URLS } from "../../constants/constent";
import "./styles.scss";

export default function SelfDestruct() {
  const [kgGramsIndex, setKgGramsIndex] = useState(0);
  const { profile } = useContext(AppContext)

  const handleSetKgGrams = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) return setKgGramsIndex(0);
    return setKgGramsIndex(1);
  };


  const logOut = () => {
    logout()
    axios.post(URLS.API + 'auth/log-out', {}, getAuthorization).then((res) => {
      if (res.status === 200) {
      }
    }).catch((e) => { })
  }

  const createHamburgerItems = () => {
    return (<>
      {getToken() ? <>
        <Link to="/settings">
          Settings
        </Link>
        <Link to="#">
          Change App SKin
        </Link>
        <p className="swtich_toggle_text">
          Kilograms
          <label className="switch">
            <input type="checkbox" onClick={handleSetKgGrams} />
            <span className="slider round"></span>
          </label>
          Grams
        </p>
        <Link to="/state-of-laws">
          State Of Laws
        </Link>
        {profile && profile.isVerified ? <>
          <Link to="/digiscale-delivery">Digiscale Delivery</Link>
          <Link to="/dispensaries">Request for Pickup</Link>
          <Link to="/my-orders">My Orders</Link>
          <Link to="/digiscale-partners">
            Digiscale Partners
          </Link>
        </> : <>
          <Link to="/apply">Digiscale Delivery</Link>
          <Link to="/apply">Request for Pickup</Link>
          <Link to="/apply">
            Digiscale Partners
          </Link>
        </>
        }

        <Link to="#" onClick={() => { logOut() }}>Log out</Link>
      </> :

        <>
          <p className="swtich_toggle_text">
            Kilograms
            <label className="switch">
              <input type="checkbox" onClick={handleSetKgGrams} />
              <span className="slider round"></span>
            </label>
            Grams
          </p>
          <Link to="/login">Login</Link>
        </>
      }
    </>
    )
  };

  return (
    <div className="self_destruct_container">
      <div className="self_destruct_header">
        <Hamburger>{createHamburgerItems()}</Hamburger>
        <Button>
          <Link to="/register">Self Destruct</Link>
        </Button>
        <AppLogo link="/settings" />
      </div>
      <div className="kg_grams_box">
        <ScaleTouch3D isKG={kgGramsIndex === 1} weightListIndex={0} />
      </div>
    </div>
  );
}
