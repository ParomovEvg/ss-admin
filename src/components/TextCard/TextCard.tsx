import React, { useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LastPage } from '@material-ui/icons';
import { createFipc } from 'react-fipc';
import { textField } from './textCard.fipc';
import './TextCard.scss';
import { DeleteModalField } from '../Template/deleteModal/deleteModalField';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';

export interface TextCardHooks {
  useTextField: textField;
}
export interface TextCardProps extends TextCardHooks {
  className?: string;
  multiline?: boolean;
  id: number;
  name: string;
}

export const TextCardComponent: React.FC<TextCardProps> = ({
  useTextField,
  children,
  className,
  name,
  id,
  multiline = false,
}) => {
  const {
    value,
    onChange,
    onSave,
    isSave,
    onReset,
    isReset,
    onBack,
    isLoading,
  } = useTextField(id, name);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const openDeleteModal = useAction(viewActions.openDeleteModal);

  return (
    <Grid item sm={multiline ? 6 : 4}>
      <Card className="TextCard">
        {isLoading && (
          <div className="TextCard__loader-wrapper">
            <CircularProgress />
          </div>
        )}
        <CardHeader
          title={name}
          action={
            <IconButton
              onClick={() => openDeleteModal(id)}
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
                <TextField
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
                />
              </form>
            </Grid>
            <Grid container item spacing={2} sm={12}>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export const TextCard$ = createFipc(TextCardComponent);
