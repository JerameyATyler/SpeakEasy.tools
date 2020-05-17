import React, {forwardRef} from "react";
import {Theme} from "../../../utils";
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

export default ({translations}) => {

    const columns = [
        {
            title: 'Vocab Word',
            field: 'word'
        },
        {
            title: 'Translations',
            field: 'translations',
            render: rowData => (
                <Autocomplete

                    multiple
                    options={rowData.translations}
                    style={{width: 300}}
                    getOptionLabel={option => option.word}
                    groupBy={option => option.language}
                    renderInput={
                        params =>
                            <TextField
                                {...params}
                                label='Translations'
                                variant='outlined'
                                placeholder='Translations'
                            />
                    }
                />
            )
        }
    ];

    const data = () => {
        let d = [];
        if (!translations) return d;
        d = d.concat([...translations]);
        return d;
    }

    return (
        <MaterialTable
            title='Vocab'
            icons={tableIcons}
            columns={columns}
            data={data()}
            options={{
                headerStyle: {
                    backgroundColor: Theme.palette.secondary.light,
                    color: Theme.palette.secondary.contrastText
                },
                rowStyle: {
                    backgroundColor: Theme.palette.primary.light,
                    color: Theme.palette.primary.contrastText
                }
            }}
            style={{
                backgroundColor: Theme.palette.primary.main,
                color: Theme.palette.primary.contrastText,
                minWidth: 500,
            }}
        />
    );
};