import React, { useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { createFipc } from 'react-fipc';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';
import { Loader } from '../Loader/Loader';
import { DropZone } from '../DropZone/DropZone.fipc';
import { ImgDto } from '../../apiWorker/typings';
export interface ImgCardHooks {
  useImgField: (
    id: number
  ) => {
    isLoading: boolean;
    onChangeDropZone: (acceptedFiles: File[]) => void;
    onSave: () => void;
    isSave: boolean;
    onBack: () => void;
    isBack: boolean;
    onReset: () => void;
    isReset: boolean;
    url: string;
  };
}

export interface ImgCardProps extends ImgCardHooks {
  className?: string;
  multiline?: boolean;
  id: number;
  name: string;
}

export const ImgCardComponent: React.FC<ImgCardProps> = ({
  children,
  className,
  name,
  id,
  useImgField,
}) => {
  const openDeleteImgFieldModal = useAction(
    viewActions.openDeleteImgFieldModal
  );
  const {
    isLoading,
    onChangeDropZone,
    onSave,
    isSave,
    isBack,
    onBack,
    onReset,
    isReset,
    url,
  } = useImgField(id);
  return (
    <Grid item sm={4}>
      <Card className="card">
        <Loader isLoading={isLoading} />
        <CardHeader
          title={name}
          action={
            <IconButton
              onClick={() => openDeleteImgFieldModal(id)}
              aria-label="settings"
            >
              <DeleteIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item sm={12}>
              <DropZone id={id} url={url} onChangeDropZone={onChangeDropZone} />
            </Grid>
            <Grid item container sm={12} spacing={1}>
              <Grid item>
                <Button
                  disabled={!isSave}
                  onClick={onSave}
                  variant={'contained'}
                  color={'primary'}
                >
                  Сохранить
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={!isBack}
                  color={'primary'}
                  variant="outlined"
                  onClick={onBack}
                >
                  Предыдущее
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={!isReset}
                  color={'primary'}
                  variant="outlined"
                  onClick={onReset}
                >
                  Сбросить
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const ImgCard$ = createFipc(ImgCardComponent);
