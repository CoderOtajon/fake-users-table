import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Box, CircularProgress } from "@mui/material"

export default function BasicTable({ fakeUsers, loading, error }) {
  if (!error && loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    )
  if (!loading && error)
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        Sorry, something went wrong!
      </h1>
    )

  return (
    <div
      style={{
        display: "flex",
        marginTop: "2rem",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Website</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fakeUsers?.map((user) => (
              <TableRow
                key={user?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user?.name}
                </TableCell>
                <TableCell align="right">{user?.username}</TableCell>
                <TableCell align="right">{user?.email}</TableCell>
                <TableCell align="right">{user?.phone}</TableCell>
                <TableCell align="right">{user?.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
