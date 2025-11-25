// src/providers/ReduxProviderClient.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";

export default function ReduxProviderClient({ children }: { children: React.ReactNode }) {
    // PersistGate waits for rehydration; you can show a spinner if you want.
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
