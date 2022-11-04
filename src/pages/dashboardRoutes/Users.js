import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { LinearProgress, Stack, TableHead } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SingleView from "./singleViews/SingleView";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function Users() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [userData, setData] = React.useState([]);
  const [selectedData, setSelectedData] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  userData.sort((a, b) => (a.calories < b.calories ? -1 : 1));
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  React.useEffect(() => {
    setIsLoading(true)
    const q = query(collection(db, "users"), orderBy("ownerId", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          accountID: doc.data().ownerId,
          fullname: doc.data().fullname,
          email: doc.data().email,
          address: doc.data().address,
          phone: doc.data().phone,
          hasShop: doc.data().hasShop === true ? "Yes" : "No",
        });
      });
      setData(data);
      setIsLoading(false)
    });
    return unsubscribe;
  }, [navigate]);

  const handleEvent = (userId) => {
    setIsClicked(true);
    const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
      setSelectedData(doc.data());
    })
    return unsub;
  };
  return (
    <Box sx={{
      marginTop: 5,
    }}
    >
      {isLoading ?
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary" />
        </Stack>
        : <>
          {isClicked === true ?
            <Box sx={{ boxShadow: 2, border: 2 }}>
              <SingleView data={selectedData} />
            </Box>
            : <>
              <TableContainer
                component={Paper}
                sx={{ minHeight:500, boxShadow: 2, border: 2 }}
              >
                <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
                  <TableHead>
                    <TableRow sx={{ fontWeigth: 700 }}>
                      <TableCell sx={{
                        fontSize: 18,
                        fontWeight: '600'
                      }}>ID</TableCell>
                      <TableCell align='center' sx={{
                        fontSize: 18,
                        fontWeight: '600'
                      }}>Full Name</TableCell>
                      <TableCell align='center' sx={{
                        fontSize: 18,
                        fontWeight: '600'
                      }}>Email</TableCell>
                      <TableCell align='center' sx={{
                        fontSize: 18,
                        fontWeight: '600'
                      }}>Address</TableCell>
                      <TableCell align='center' sx={{
                        fontSize: 18,
                        fontWeight: '600'
                      }}>Phone</TableCell>
                      <TableCell align='center' sx={{
                        fontSize: 18,
                        fontWeight: '600'
                      }}>Has Shop</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? userData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      : userData
                    ).map((row) => (
                      <TableRow key={row.id} onClick={() => handleEvent(row.accountID)} sx={{
                        transition: 'all ease 200ms',
                        '&:hover': {
                          transform: 'scale(1.01)',
                          boxShawd: '0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)'
                        },
                        cursor: 'pointer'
                      }}>
                        <TableCell component='th' scope='row' align='left' style={{
                          width: 160, fontWeight: 'bold', cursor: 'pointer',
                        }}>
                          {row.accountID.substring(0, 7)}
                        </TableCell>
                        <TableCell style={{ width: 160, fontWeight: 'bold' }} align='center'>
                          {row.fullname}
                        </TableCell>
                        <TableCell style={{ width: 160, fontWeight: 'bold' }} align='center'>
                          {row.email}
                        </TableCell>
                        <TableCell style={{ width: 160, fontWeight: 'bold' }} align='center'>
                          {row.address}
                        </TableCell>
                        <TableCell style={{ width: 160, fontWeight: 'bold' }} align='center'>
                          {row.phone}
                        </TableCell>
                        <TableCell style={{ width: 160, fontWeight: 'bold'}} align='center'>
                          {row.hasShop}
                        </TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                        colSpan={6}
                        count={userData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer></>}
        </>
      }
    </Box>
  );
}
