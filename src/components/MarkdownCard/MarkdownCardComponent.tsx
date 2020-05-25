import React, { useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { createFipc } from 'react-fipc';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';
import { Loader } from '../Loader/Loader';
import './MarkdownCard.scss';
export interface MarkdownCardHooks {
  useMarkdown: (
    id: number
  ) => {
    name: string;
    label: string;
    isLoading: boolean;
    text: string;
    parseText: string;
    addValueTextHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSave: boolean;
    onSave: () => void;
    isReset: boolean;
    onReset: () => void;
    isBack: boolean;
    onBack: () => void;
  };
}

export interface MarkdownCardProps extends MarkdownCardHooks {
  className?: string;
  multiline?: boolean;
  id: number;
}

export const MarkdownCardComponent: React.FC<MarkdownCardProps> = ({
  children,
  className,
  id,
  useMarkdown,
}) => {
  const openDeleteMarkdownFieldModal = useAction(
    viewActions.openDeleteMarkdownFieldModal
  );
  const {
    isLoading,
    name,
    label,
    text,
    parseText,
    addValueTextHandler,
    isSave,
    onSave,
    isReset,
    onReset,
    isBack,
    onBack,
  } = useMarkdown(id);
  return (
    <Grid item sm={6}>
      <Card className="card">
        <Loader isLoading={isLoading} />
        <CardHeader
          title={name}
          action={
            <IconButton
              onClick={() => openDeleteMarkdownFieldModal(id)}
              aria-label="settings"
            >
              <DeleteIcon />
            </IconButton>
          }
        />
        <CardHeader title={label} />
        <CardContent>
          <Grid container item sm={12} spacing={2}>
            <Grid item sm={6}>
              <TextField
                label="Ваш текст"
                multiline
                variant="filled"
                fullWidth={true}
                value={text}
                onChange={addValueTextHandler}
              />
            </Grid>
            <Grid item sm={6}>
              <div
                className="markdown__translate"
                dangerouslySetInnerHTML={{
                  __html: parseText,
                }}
              ></div>
            </Grid>
            <Grid item sm={3}>
              <Button
                disabled={!isSave}
                onClick={onSave}
                variant={'contained'}
                color={'primary'}
              >
                Сохранить
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                disabled={!isBack}
                onClick={onBack}
                color={'primary'}
                variant="outlined"
              >
                Предыдущее
              </Button>
            </Grid>
            <Grid item sm={3}>
              <Button
                disabled={!isReset}
                onClick={onReset}
                color={'primary'}
                variant="outlined"
              >
                Сбросить
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const MarkdownCard$ = createFipc(MarkdownCardComponent);
