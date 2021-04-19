import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
  cell: {
    
  }
});

const SimpleTable = ({data,classes}) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Période</TableCell>
            <TableCell align="center">Capital Amorti</TableCell>
            <TableCell align="center">Intérêts</TableCell>
            <TableCell align="center">Capital restant dû</TableCell>
            <TableCell align="center">Mensualité</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((item, i) => {
              const {remboursementMensuel, capitalAmorti, interet, capitalRestantDu} = item;
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i+1}</TableCell>
                  <TableCell align="center">{Math.round(capitalAmorti*100)/100}</TableCell>
                  <TableCell align="center">{Math.round(interet*100)/100}</TableCell>
                  <TableCell align="center">{Math.round(capitalRestantDu*100)/100}</TableCell>
                  <TableCell align="center">{Math.round(remboursementMensuel*100)/100}</TableCell>
                </TableRow>
            )})
          }
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);