/* eslint-disable @typescript-eslint/naming-convention */
import React = require("react");

import { Container } from './style';

interface LeftPanelProps {
    message: string
}

export default function LeftPanel({ message }: LeftPanelProps) {
    return(
        <div>
            <span>teste {message}</span>
        </div>
    );
}