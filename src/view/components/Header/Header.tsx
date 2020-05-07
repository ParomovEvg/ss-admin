import React from 'react';
import cn from 'classnames';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.scss';
import { CallBackHook } from '../../../hooks/types';
import { createFipc } from 'react-fipc';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../../model/viewSlice';

export interface HeaderHooks {
    useOpenMenu: CallBackHook;
}
export interface HeaderProps extends HeaderHooks {
    className?: string;
}

export const HeaderComponent: React.FC<HeaderProps> = ({
    children,
    className,
    useOpenMenu,
}) => {
    const blockClassName = cn(className, 'Header');
    const openHandler = useOpenMenu();
    return (
        <AppBar position="static" className={blockClassName}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className="Header__icon-button"
                    color="inherit"
                    aria-label="menu"
                    onClick={openHandler}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="Header__text">
                    {children}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export const Header = createFipc(HeaderComponent)({
    useOpenMenu: () => {
        const handleOpen = useAction(viewActions.openMenu);
        return () => handleOpen();
    },
});
