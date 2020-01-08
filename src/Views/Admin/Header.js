import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Theme from "../../Components/Theme/Theme";

export const columns = [
    {id: 'category', label: 'Category', minWidth: 170, required:true},
    {id: 'chinese', label: 'Chinese', minWidth: 170, required:true},
    {id: 'pinyin', label: 'Pinyin', minWidth: 170, required:true},
    {id: 'english', label: 'English', minWidth: 170, required:true},
    {id: 'synonyms', label: 'Synonyms', minWidth: 170, required:false},
    {id: 'tone', label: 'Tone/s', minWidth: 85, align: 'right', format: value => value.toLocaleString(), required:false},
    {id: 'audio', label: 'Audio', minWidth: 85, required:false},
    {id: 'edit', label: 'Edit', minWidth: 85, required:false},
    {id: 'delete', label: 'delete', minWidth: 85, required:false},
];

const Header = () => (
    <TableHead>
        <TableRow>
            {columns.map(column => (
                <TableCell
                    key={column.id}
                    align={column.align}
                    style={
                        {
                            minWidth: column.minWidth,
                            backgroundColor: Theme.palette.primary.main,
                            color: Theme.palette.primary.contrastText
                        }
                    }
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
);

export default Header;