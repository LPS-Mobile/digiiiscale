import React from "react";

export const AppContext = React.createContext(
    {
        cart: [], setCart: () => { },
        profile: null, setProfile: () => { },
    },
);