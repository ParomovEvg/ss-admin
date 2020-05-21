import React, { useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LastPage } from '@material-ui/icons';
import { createFipc } from 'react-fipc';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';
import { Loader } from '../Loader/Loader';

export interface ImgCardHooks {
  useImgField: (
    id: number
  ) => {
    isLoading: boolean;
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
  multiline = false,
}) => {
  const openDeleteImgFieldModal = useAction(
    viewActions.openDeleteImgFieldModal
  );
  const { isLoading } = useImgField(id);
  return (
    <Grid item sm={multiline ? 6 : 4}>
      <Card className="TextCard">
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
              <form>
                {/* <TextField
                  fullWidth
                  multiline={multiline}
                  name="title"
                  label="Текст заголовка"
                  variant="outlined"
                  value={value}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position={'end'}>
                        <IconButton onClick={onBack} size={'small'}>
                          <LastPage />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                /> */}
              </form>
            </Grid>
            {/* <Grid container item spacing={2} sm={12}>
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
                  disabled={!isReset}
                  onClick={onReset}
                  variant={'outlined'}
                  color={'primary'}
                >
                  Сбросить
                </Button>
              </Grid>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const ImgCard$ = createFipc(ImgCardComponent);
