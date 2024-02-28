import React from 'react';
import { TextInputObj, TextTableObj, TextFieldObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import { Grid, Paper, Typography } from '@mui/material';
import EstimateFormTextField from './EstimateFormTextField';

interface EstimateFormTextFieldProps {
    textTableObj: TextTableObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextTable = ({
    textTableObj,
    fieldValues,
    setFieldValues,
}: EstimateFormTextFieldProps) => {
    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
            <Grid container spacing={2}>
                {textTableObj.rows.map((row, rowIndex) => (
                    <Grid item xs={12} key={rowIndex} container>
                        {row.map((cell, cellIndex) => {
                            if (cell.type === "TextInput") {
                                const textInput = cell as TextInputObj;
                                return (
                                    <Grid item xs={12 / row.length} key={cellIndex}>
                                        <EstimateFormTextField textInputObj={textInput} fieldValues={fieldValues} setFieldValues={setFieldValues} />
                                    </Grid>
                                );
                            }
                            else if (cell.type === "TextField") {
                                const textField = cell as TextFieldObj;
                                return (
                                    <Grid item xs={12 / row.length} key={cellIndex}>
                                        <Typography>{textField.value}</Typography>
                                    </Grid>
                                );
                            }
                            else {
                                return null;
                            }
                        })}
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default EstimateFormTextTable;
