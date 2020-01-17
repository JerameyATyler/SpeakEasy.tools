import React, { useState} from "react";
import {useQuery} from "@apollo/react-hooks";

import {makeStyles} from "@material-ui/core";
import {Theme} from "../../Components/Theme";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import TableContainer from "@material-ui/core/TableContainer";
import Header from "./Header";
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";
import Body from "./Body";
import UploadFile from './UploadFile';
import gql from "graphql-tag";

const GET_LESSONS_PAGE = gql`
    query getLessonsPage($limit: Int!, $offset: Int!) {
      lessons(limit: $limit, offset: $offset, order_by: {category: asc}) {
        category
        chinese
        pinyin
        english
        synonyms
        tone
        audio
        id
      }
      lessons_aggregate {
        aggregate {
          count
        }
      }
    }
`;

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 800,
    },
    header: {
        backgroundColor: theme.palette.primary.main,
    }
}));

export const Admin = () => {
    const classes = useStyles(Theme);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const {loading, error, data} = useQuery(GET_LESSONS_PAGE,{
        variables: {
            limit: rowsPerPage,
            offset: (page * rowsPerPage)
        },
        fetchPolicy: 'cache-and-network'
    });

    if(loading) {
        return <div>...loading</div>
    }
    if(error) {
        return <div>error {error.message}</div>
    }

    return (
        <Paper className={clsx(classes.root)}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label='SpeakEasy Curriculum table'>
                    <Header/>

                        <Body
                            data={data? data.lessons: []}
                        />

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={data? data.lessons_aggregate.aggregate.count: 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{
                    backgroundColor: Theme.palette.primary.main,
                    color: Theme.palette.primary.contrastText
                }}
            />
            <UploadFile/>
        </Paper>
    );
}