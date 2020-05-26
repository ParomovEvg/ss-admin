import React from 'react';
import { Grid, Card, Button } from '@material-ui/core';
import { createFipc } from 'react-fipc';
import { MarkdowmType } from '../../redux/slices/markdownFieldSlice';
import { DeleteMarkdownModal } from '../deleteModal/DeleteMarkdownModal';
import { MarkdownCard } from '../MarkdownCard/MarkdownCard.fipc';
import { useAction } from '../../hooks/use-action';
import { viewActions } from '../../redux/slices/viewSlice';
import { AddMarkdownModal } from '../AddMarkdownModal/AddMarkdownModal.fipc';
export interface MarkdownFieldListComponentHooks {
  useMarkdownFields: () => {
    markdownFields: MarkdowmType[];
  };
}

export interface MarkdownFieldListComponentProps
  extends MarkdownFieldListComponentHooks {
  id: number;
}

export const MarkdownFieldListComponent: React.FC<MarkdownFieldListComponentProps> = ({
  useMarkdownFields,
  id,
}) => {
  const { markdownFields } = useMarkdownFields();
  const openAddMarkdownFieldModal = useAction(
    viewActions.openAddMarkdownFieldModal
  );
  return (
    <>
      <Grid container spacing={3}>
        {markdownFields.map(({ id }) => {
          return <MarkdownCard id={id} key={id} />;
        })}
        <AddMarkdownModal id={id} />
        <Grid item sm={4}>
          <Card className="AddCard">
            <Button onClick={() => openAddMarkdownFieldModal()} color="primary">
              Добавить поле markdown
            </Button>
          </Card>
        </Grid>
      </Grid>
      <DeleteMarkdownModal />
    </>
  );
};

export const MarkdownFieldList$ = createFipc(MarkdownFieldListComponent);
