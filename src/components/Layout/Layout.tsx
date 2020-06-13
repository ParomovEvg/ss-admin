import React from 'react';
import cn from 'classnames';
import { Header } from '../Header/Header';
import { Container, IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { grey } from '@material-ui/core/colors';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';
import './Layout.scss';
import { AddScreenModal } from '../AddScreenModal/AddScreenModal.fipc';
import { DeleteModalScreen } from '../deleteModal/deleteModalScreen';
export interface LayoutProps {
  className?: string;
  title: string;
  description?: string;
  isScreen?: boolean;
  id?: number;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  description,
  children,
  className,
  isScreen,
  id,
}) => {
  const blockClassName = cn(className, 'Layout');
  const openRenameScreenModal = useAction(viewActions.openRenameScreenModal);
  const openScreenDeleteModal = useAction(viewActions.openScreenDeleteModal);
  return (
    <div className={blockClassName}>
      <Header>
        <span className="Layout__name">{title}</span>
        {isScreen && (
          <>
            {description && (
              <span className="Layout__name">— {description}</span>
            )}
            <div className="Layout__btns">
              <IconButton
                onClick={() => openRenameScreenModal()}
                aria-label="settings"
              >
                <CreateIcon style={{ color: grey[50] }} />
              </IconButton>
              <IconButton
                onClick={() => openScreenDeleteModal(id)}
                aria-label="settings"
              >
                <DeleteIcon style={{ color: grey[50] }} />
              </IconButton>
            </div>
          </>
        )}
      </Header>
      <Container className="Layout__container">{children}</Container>
      <AddScreenModal />
      <DeleteModalScreen />
    </div>
  );
};
