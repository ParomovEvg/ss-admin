import React from 'react';
import cn from 'classnames';
import './Layout.scss';
import { Header } from '../Header/Header';
import { Card, Container, Typography } from '@material-ui/core';

export interface LayoutProps {
    className?: string;
    title: string;
}

export const Layout: React.FC<LayoutProps> = ({
    title,
    children,
    className,
}) => {
    const blockClassName = cn(className, 'Layout');
    return (
        <div className={blockClassName}>
            <Header>{title}</Header>
            <Container className="Layout__container">{children}</Container>
        </div>
    );
};
