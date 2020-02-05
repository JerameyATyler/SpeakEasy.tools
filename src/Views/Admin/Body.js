import React from "react";
import TableBody from "@material-ui/core/TableBody";
import Row from "./Row";
import AddRow from "./AddRow";

const Body = (props) => {
    const data = props.data;
    return (
        <TableBody>
            {data.map(lesson =>
                <Row data={lesson} key={lesson.id}/>
            )}
            <AddRow/>
        </TableBody>
    )
};

export default Body;