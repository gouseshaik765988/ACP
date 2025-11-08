"use client";

import { Suspense } from "react";
import HomePageContent from "../HomePageContent/page";

export default function HomePage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <HomePageContent />
        </Suspense>
    );
}
