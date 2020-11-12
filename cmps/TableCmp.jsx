import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { PlaceModal } from '../cmps/PlaceModal'
import { selectPlace } from '../actions/placeActions.js';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';



export function TableCmp(props) {
    const dispatch = useDispatch()
    const { filterBy, selectedPlace,places } = useSelector(state => state.placeReducer)
    let [placesToShow,setPlacesToShow] = useState([])
    useEffect(() => {
        getPlacesToShow(filterBy)
    }, [places,filterBy])

    async function getPlacesToShow(filterBy ) {
        if(filterBy && filterBy.title){
            const { title } = filterBy
            setPlacesToShow(placesToShow = places.filter(place => place.title.toLowerCase().includes(title.toLowerCase())) ) 
        }else{
            setPlacesToShow(placesToShow = places)
        } 
    }

    function onSelectPlace(placeId = '') {
        dispatch(selectPlace(placeId))
    }

    const windowSize = useMediaQuery('(max-width:600px)');
    function getLat(place) {
        if (!windowSize) return place.position.lat
        else return place.position.lat.toFixed(2) + '...'
    }
    function getLng(place) {
        if (!windowSize) return place.position.lng
        else return place.position.lng.toFixed(2) + '...'
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: '#01c5c4',
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
            [theme.breakpoints.down('xs')]: {
                padding: 10,
                fontSize: 12
            },
        },
    }))(TableCell);
    const StyledTableRow = withStyles((theme) => ({
        root: {
            width: '100%',
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);
    const useStyles = makeStyles((theme) => ({
        table: {
            width: '100%',
        }
    }))
    const classes = useStyles()
    if (!placesToShow.length) return <h1>No matching results</h1>
    else return (
        <React.Fragment>
            <TableContainer component={Paper} className={classes.table}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name </StyledTableCell>
                            <StyledTableCell align="left">Lang</StyledTableCell>
                            <StyledTableCell align="left">Lat</StyledTableCell>
                            <StyledTableCell align="left"></StyledTableCell>
                        </TableRow>

                    </TableHead>

                    <TableBody>
                        {placesToShow.map((place) => (
                            <StyledTableRow key={place._id}>
                                <StyledTableCell component="th" scope="row">
                                    {place.title || 'No title yet'}
                                </StyledTableCell>
                                <StyledTableCell align="left">{getLat(place)}</StyledTableCell>
                                <StyledTableCell align="left">{getLng(place)}</StyledTableCell>
                                <StyledTableCell align="left" className="description-slot column-layout">

                                    <button onClick={() => onSelectPlace(place._id)}>Show more</button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedPlace && <PlaceModal closeModal={onSelectPlace} place={selectedPlace} />}
        </React.Fragment>
    );
}


