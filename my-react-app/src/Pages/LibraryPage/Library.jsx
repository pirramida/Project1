import { TableBody } from '@mui/material';
import React, {useEffect, useState, TableContainer, TableHead, TableRow, TableCell, Table} from 'react';

const NamesTable = ["Название", "Автор", "Год издания", "Статус"];

const Library = () => {

    return(
        <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow >
                    {NamesTable.map((name, indexName) => (
                        <TableCell key={indexName}>
                            {name}
                        </TableCell>
                    ))}
                    </TableRow>
                    
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
};

export default Library;