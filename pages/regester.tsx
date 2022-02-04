import React from 'react';
import { useEffect } from "react";

const Regester = () => {

    if (process.browser) {
        document.addEventListener("DOMContentLoaded", function () {
            alert('Finished loading');
        });
    }
};

export default Regester;
