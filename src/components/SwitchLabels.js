import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

//switch component
export default function SwitchLabels({ onChangeFunc, unit }) {

    return (

        <FormControlLabel control={<Switch checked={unit === "℃" ? true : false} onChange={onChangeFunc} />} label="℃" />


    );
}