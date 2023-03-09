import React from "react";

export const AppContext = React.createContext(
    {
        cart: [], setCart: (as) => { },
        profile: null, setProfile: () => { },
    },
);