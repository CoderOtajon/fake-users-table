import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { nanoid } from "nanoid"
import { useRef, useState } from "react"

export default function AlertDialog({ postFakeUser, loading, error }) {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const nameRef = useRef()
  const userNameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const websiteRef = useRef()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage(null)

    if (
      !nameRef.current.value ||
      !userNameRef.current.value ||
      !emailRef.current.value ||
      !phoneRef.current.value ||
      !websiteRef.current.value
    ) {
      setErrorMessage("Please fill all fields in the form")
      return
    }

    postFakeUser({
      name: nameRef.current.value,
      username: userNameRef.current.value,
      email: emailRef.current.value,
      id: nanoid(),
      phone: phoneRef.current.value,
      website: websiteRef.current.value,
    })

    handleClose()
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      {!loading && !error && (
        <Button variant="outlined" onClick={handleClickOpen}>
          Add a new User
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ textAlign: "center", marginTop: "1rem" }}
          id="alert-dialog-title"
        >
          Fill User's Info
        </DialogTitle>
        <DialogTitle sx={{ textAlign: "center" }} id="alert-dialog-title">
          {errorMessage && errorMessage}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            inputRef={nameRef}
            sx={{ width: "clamp(30rem, 100%, 40rem)", marginBlock: "1rem" }}
            id="outlined-basic"
            label="Name and Last Name"
            variant="outlined"
          />
          <TextField
            inputRef={userNameRef}
            sx={{ width: "clamp(30rem, 100%, 40rem)", marginBlock: "1rem" }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <TextField
            inputRef={emailRef}
            sx={{ width: "clamp(30rem, 100%, 40rem)", marginBlock: "1rem" }}
            id="outlined-email"
            label="Email"
            variant="outlined"
          />
          <TextField
            inputRef={phoneRef}
            sx={{ width: "clamp(30rem, 100%, 40rem)", marginBlock: "1rem" }}
            id="outlined-number"
            label="Phone"
            variant="outlined"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            inputRef={websiteRef}
            sx={{ width: "clamp(30rem, 100%, 40rem)", marginBlock: "1rem" }}
            id="outlined-basic"
            label="Website"
            variant="outlined"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
