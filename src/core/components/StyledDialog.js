import React from "react";
import { //Button, 
  Dialog, DialogActions, DialogTitle, IconButton
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Button } from "antd";
// import { ReactPropTypes } from "react";

const StyledDialog = (props) => {

  var { dialogOpen, setDialogOpen, closable, onClose, children, title, height, width, affirm, cancel, reject } = props;

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        //   classes={{ paper: classes.dialog }}
        scroll="paper"
        PaperProps={{
          sx: {
            // mt: "-10rem",
            position: "absolute",
            // width: "25rem",
            // ...{ width: width ? width : "250rem" },
            ...{ height: height ? height : "28rem" },
            mr: "auto",
            top: "auto",
            bottom: "auto",
            // ml: "auto",
            //   mb: "auto",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}
          {closable ? (
            <IconButton
              aria-label="close"
              onClick={() => setDialogOpen(false)/*onClose*/}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          ) : null}
        </DialogTitle>

        {children}
        {(affirm || reject || cancel) &&
          <DialogActions>
            {affirm && affirm.action && <Button disabled={affirm.disabled || false}
              variant="contained"
              className='bg-blue-500' type='primary'
              onClick={affirm.action}>{affirm.label ? affirm.label : 'OK'}</Button>}
            {reject && reject.action && <Button className="bg-red-500 text-white" onClick={reject.action}>{reject.label ? reject.label : 'No'}</Button>}
            {cancel && cancel.action && <Button onClick={cancel.action}>{cancel.label ? cancel.label : 'Cancel'}</Button>}
            {/* <Button variant="outlined" onClick={() => { setSelected([]); setDialogOpen(false) }}>Cancel</Button> */}
          </DialogActions>
        }
      </Dialog>
    </div>
  );
};


// StyledDialog.ReactPropTypes = {
//   dialogOpen: ReactPropTypes.bool,
//   setDialogOpen: ReactPropTypes.bool,
//   closable: ReactPropTypes.bool,
//   onClose: ReactPropTypes.func,
//   // children, 
//   // title, 
//   // height, 
//   // width, 
//   // affirm, 
//   // cancel, 
//   // reject
// }

export default StyledDialog;
