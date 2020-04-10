import React, {useState} from "react";

import {makeStyles, Toolbar} from "@material-ui/core";
import {Theme} from "../../Components/Theme";
import clsx from "clsx";
import TableContainer from "@material-ui/core/TableContainer";
import Header from "./Header";
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";
import Body from "./Body";
import PaginateLessons from "../../Queries/PaginateLessons";

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

    // rowsPerPage = lessonLimit, page = lessonPage
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const samplePage = 0;
    const samplesPerPage = 1;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const {lessons, totalLessons} = PaginateLessons({
        lessonLimit: rowsPerPage,
        lessonPage: page,
        sampleLimit: samplesPerPage,
        samplePage: samplePage
    });

    return (
        <div className={clsx(classes.root)}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label='SpeakEasy Curriculum table'>
                    <Header/>

                    <Body
                        data={lessons}
                    />

                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component='div'
                count={totalLessons}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                style={{
                    backgroundColor: Theme.palette.primary.main,
                    color: Theme.palette.primary.contrastText
                }}
            />
            <Toolbar/>
        </div>
    );
};