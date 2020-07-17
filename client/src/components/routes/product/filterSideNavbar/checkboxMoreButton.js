import React, {useState} from 'react';
import log from 'loglevel';
import {Box, Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SortedCheckboxList from "../../../ui/sortedCheckboxList";

export default function CheckboxMoreButton(props) {
    const [moreButtonState, setMoreButtonState] = useState({active: false, topPosition: 0})

    if (!props.checkboxList) {
        log.debug(`[CheckboxMoreButton] apparelList is null`)
        return null
    }

    const handleCheckBoxChange = (id, value) => {
        log.info(`[CheckboxMoreButton] handleCheckBoxChange(id) = ${id}, value = ${value}`)
        props.checkboxChangeHandler(id, value)
    }

    const handleMoreButton = (event) => {
        setMoreButtonState({active: true, topPosition: parseInt(event.clientY)})
    }

    const handleMoreListCloseButton = () => {
        setMoreButtonState({active: false, topPosition: 0})
    }

    const renderMoreButtonList = () => {
        return (
            <Paper elevation={3} variant="outlined" square
                   style={{backgroundColor: "inherit", width: "200vh", height: "70vh"}}>
                <Grid container direction="row" style={{
                    height: '70vh', zIndex: 1300, overflow: "auto", left: 0, width: "60%",
                    position: "fixed", top: 150, backgroundColor: "white", border: "1px solid #eaeaec",
                    boxShadow: "0 1px 8px rgba(0,0,0,.1)"
                }}>
                    <Grid item sm={11}>
                    <SortedCheckboxList attrList={props.checkboxList}
                                        title={props.title}
                                        propName={props.propName}
                                        selectedAttrList={props.selectedCheckboxList}
                                        onChangeHandler={handleCheckBoxChange}/>
                    </Grid>
                    <Grid item sm={1} container justify="flex-end" style={{height: "5%", paddingRight: "0.5rem"}}>
                        <IconButton size="medium"
                                    color="primary"
                                    onClick={handleMoreListCloseButton}
                                    style={{position: "fixed"}}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

    const renderMoreButton = () => {
        if (props.checkboxList.length > 6) {
            return (
                <Box pl={1.5} pb={1}>
                    <Button color="secondary" onClick={handleMoreButton}>
                        {`+ ${props.checkboxList.length - 6} more`}
                    </Button>
                </Box>
            )
        }
        return null
    }


    log.debug(`[CheckboxMoreButton] selectedApparels = ${JSON.stringify(props.selectedCheckboxList)}`)

    log.info(`[CheckboxMoreButton] Rendering CheckboxMoreButton Component`)

    return (
        <>
            {renderMoreButton()}
            {moreButtonState.active ? renderMoreButtonList() : null}
        </>
    );
}
