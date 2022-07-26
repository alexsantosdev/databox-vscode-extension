/* eslint-disable @typescript-eslint/naming-convention */
import React = require("react");

import { Container } from './style';

interface LeftPanelProps {
    message: string
}

export function LeftPanel({ message }: LeftPanelProps) {
    return(
        <Container>
            <span>teste {message}</span>
        </Container>
    );
}