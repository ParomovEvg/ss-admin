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
import { TextFieldType } from './textCard.fipc';
import './TextCard.scss';
import { viewActions } from '../../redux/slices/viewSlice';
import { useAction } from '../../hooks/use-action';
import { Loader } from '../Loader/Loader';

export interface TextCardHooks {
  useTextField: TextFieldType;
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
  const openDeleteTextFieldModal = useAction(
    viewActions.openDeleteTextFieldModal
  );

  return (
    <Grid item sm={4}>
      <Card className="card">
        <Loader isLoading={isLoading} />
        <CardHeader
          title={name}
          action={
            <IconButton
              onClick={() => openDeleteTextFieldModal(id)}
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
                  multiline={true}
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
