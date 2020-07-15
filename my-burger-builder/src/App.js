import React, { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import {
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import {
  TopDivStyled,
  ManageSectionWrapper,
  ActionFlexStyled,
  zIndexOverride,
} from "./ManageSubmission.styles";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import {
  DisplayMessage,
  SendMessage,
  ShowSnackBar,
} from "../../../../Utils/ActionTrigger";
import { useAuth } from "../../../../services/authService";
import PropTypes from "prop-types";
import { userRoles } from "../../../../constants";
import { useUsers } from "../../../../services/usersService";
import { useSubmission } from "../../../../services/submissionService";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#666666",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  buttonWrapper: {
    margin: "0 0 16px 0",
    float: "right",
  },
  button: {
    borderRadius: "5px",
    backgroundColor: "#009abb",
    fontSize: "16px",
    color: "#ffffff",
    shadow: "5px 5px 5px #999999",
    textTransform: "none",
    "&:hover": {
      borderRadius: "5px",
      background: "#007C96",
      fontSize: "16px",
      color: "ffffff",
    },
  },
  alertWrapper: {
    margin: "5px",
  },
  actionButton: {
    width: 30,
  },
  actionContent: {
    display: "flex",
  },
  hideVisiblity: {
    visibility: "hidden",
  },
  deleteDialogBox: {
    "& *": {
      fontSize: 14,
    },
    "& .MuiDialog-paper": {
      width: 560,
    },
    "& .MuiDialogTitle-root": {
      paddingBottom: 0,
      "& h2": {
        fontWeight: 600,
      },
    },
    "& span.MuiTypography-root": {
      color: "#333333",
    },
    "& .MuiDialogActions-root": {
      paddingTop: 0,
      fontWeight: 600,
      "& .MuiButton-root:first-child": {
        marginRight: 25,
      },
      "& .MuiButtonBase-root": {
        fontWeight: 600,
      },
    },
  },
});

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const { t } = useTranslation();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell
          align="left"
          key="name"
          sortDirection={orderBy === "name" ? order : false}
          style={zIndexOverride}
        >
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={createSortHandler("name")}
          >
            {t("submission.manage.submissionList.tableColumns.submissionName")}
          </TableSortLabel>
        </StyledTableCell>
        <StyledTableCell
          align="left"
          key="year"
          sortDirection={orderBy === "year" ? order : false}
          style={zIndexOverride}
        >
          <TableSortLabel
            active={orderBy === "year"}
            direction={orderBy === "year" ? order : "asc"}
            onClick={createSortHandler("year")}
          >
            {t("submission.manage.submissionList.tableColumns.submissionYear")}
          </TableSortLabel>
        </StyledTableCell>
        <StyledTableCell align="left" key="submissionAdmins">
          {t("submission.manage.submissionList.tableColumns.submissionAdmin")}
        </StyledTableCell>
        <StyledTableCell align="left" key="observers">
          {t("submission.manage.submissionList.tableColumns.observer")}
        </StyledTableCell>
        <StyledTableCell align="left" key="actions">
          {t("submission.manage.submissionList.tableColumns.actions")}
        </StyledTableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const ManageSubmissionDef = (props) => {
  const { t } = useTranslation();
  const auth = useAuth();
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackBar] = useState(false);
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [, setOffset] = useState(page * rowsPerPage);
  const [totalCount, setTotalCount] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState();
  const users = useUsers();

  const { getSearchSubmissions } = useSubmission();

  const getData = useCallback(
    (page, rowsPerPage, sortCol, sortBy) => {
      if (auth.isAuthenticated) {
        const url = encodeURI(
          "?name=" +
            (props.filterData.name || "") +
            "&year=" +
            (props.filterData.year || new Date().getFullYear()) +
            "&p=" +
            (parseInt(page) === 0 ? 1 : parseInt(page)) +
            "&ps=" +
            parseInt(rowsPerPage) +
            `&s=${sortCol}:${sortBy}`
        );
        getSearchSubmissions(url)
          .then(function (response) {
            if (
              response &&
              response.hasOwnProperty("values") &&
              response.values &&
              response.count > 0
            ) {
              setTableData(response.values);
              setTotalCount(response.totalCount);
              setIsLoading(false);
            } else {
              setTableData([]);
              setTotalCount(0);
              setIsLoading(false);
            }
          })
          .catch(function (response) {
            console.log(response);
            setIsLoading(false);
          });
      }
    },
    [props, auth, getSearchSubmissions]
  );

  useEffect(() => {
    getData(page + 1, rowsPerPage, orderBy, order);
  }, [page, rowsPerPage, orderBy, order, getData]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc" ? "desc" : "asc";
    setOrder(isAsc);
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setOffset(page * rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setOffset(page * parseInt(event.target.value, 10));
    setPage(page);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleDeleteSubmission = (submissionId) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_BASEURL}/submissions/${submissionId}`,
      headers: { Authorization: "Bearer " + auth.keycloak.token },
    })
      .then(function (response) {
        setOpen(false);
        setSnackBar(true);
        if (tableData.length === 1) {
          setTableData([]);
        }
        getData(page, rowsPerPage, orderBy, order);
      })
      .catch(function (error) {
        setOpen(false);
        SendMessage(
          props,
          error.response.data.code,
          "error",
          "/admin/submissions"
        );
      });
  };

  return (
    <ManageSectionWrapper>
      {isLoading ? (
        <Typography
          variant="h6"
          color="inherit"
          align="center"
          paragraph={false}
        >
          {t("globals.list.messages.fetchingInfo")}
        </Typography>
      ) : (
        <div className="ManageSectionWrapper-root">
          <div>
            {!snackbar && <DisplayMessage {...props} />}
            <div className={classes.buttonWrapper}>
              {users && users.me.permissions.CREATE_SUBMISSION && (
                <Link to="/admin/submissions/new">
                  <Button variant="contained" className={classes.button}>
                    <AddCircleIcon />
                    &nbsp;{t("submission.manage.ctaTextForCreateSubmission")}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <TopDivStyled>
            <TableContainer component={Paper} style={{ height: "95%" }}>
              <Table
                className={classes.table}
                aria-label="customized table"
                stickyHeader
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {isLoading ? (
                    <StyledTableRow>
                      <StyledTableCell colSpan="5">
                        <Typography
                          variant="h6"
                          color="inherit"
                          align="center"
                          paragraph={false}
                        >
                          {t(
                            "submission.manage.submissionList.dataLoadingText"
                          )}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    false
                  )}
                  {!isLoading &&
                  tableData &&
                  Array.isArray(tableData) &&
                  tableData.length > 0 ? (
                    tableData.map((row) => (
                      <StyledTableRow key={row.name + row.year}>
                        <StyledTableCell component="th" scope="row">
                          <Typography noWrap={true}>{row.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography>{row.year}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography noWrap={true}>
                            {row.assignees &&
                              row.assignees
                                .filter(
                                  (assignee) =>
                                    assignee.role === userRoles.submissionAdmin
                                )
                                .map((assignee) => assignee.name)
                                .join(", ")}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell align="left">
                          <Typography noWrap={true}>
                            {row.assignees &&
                              row.assignees
                                .filter(
                                  (assignee) =>
                                    assignee.role === userRoles.observer
                                )
                                .map((assignee) => assignee.name)

                                .join(", ")}
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell
                          align="left"
                          className={classes.actionButton}
                        >
                          <span className={classes.actionContent}>
                            <span
                              className={
                                !row._links.edit ? classes.hideVisiblity : ""
                              }
                            >
                              {row._links.edit &&
                              users &&
                              users.me &&
                              (users.me.permissions.EDIT_OWNED_SUBMISSIONS ||
                                users.me.permissions.EDIT_ALL_SUBMISSIONS) ? (
                                <Tooltip
                                  title={t(
                                    "globals.list.actionIcons.edit.tooltip"
                                  )}
                                >
                                  <IconButton aria-label="edit ">
                                    <Link
                                      to={`/admin/submissions/${row._links.edit.href.substring(
                                        row._links.edit.href.lastIndexOf("/") +
                                          1,
                                        row._links.edit.href.length
                                      )}/edit`}
                                    >
                                      <EditIcon />
                                    </Link>
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                            </span>
                            <span
                              className={
                                !row._links.delete ? classes.hideVisiblity : ""
                              }
                            >
                              {users &&
                              users.me &&
                              (users.me.permissions.DELETE_OWNED_SUBMISSIONS ||
                                users.me.permissions.DELETE_ALL_SUBMISSIONS) ? (
                                <Tooltip
                                  title={t(
                                    "globals.list.actionIcons.delete.tooltip"
                                  )}
                                >
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                      setOpen(row.name);
                                      setSnackBar(false);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                ""
                              )}
                              <Dialog
                                className={classes.deleteDialogBox}
                                open={row.name === open}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {t(
                                    "globals.list.actionIcons.delete.dialog.dialogTitle"
                                  )}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    {t(
                                      "globals.list.actionIcons.delete.dialog.dialogMessage"
                                    )}
                                    <Typography component="span">
                                      {" "}
                                      "{row.name}"?
                                    </Typography>
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <ActionFlexStyled>
                                    <Button
                                      onClick={handleCloseDialog}
                                      color="primary"
                                    >
                                      {t(
                                        "globals.list.actionIcons.delete.dialog.dialogCancel"
                                      )}
                                    </Button>
                                    <Button
                                      onClick={() =>
                                        handleDeleteSubmission(
                                          row._links.delete.href.substring(
                                            row._links.delete.href.lastIndexOf(
                                              "/"
                                            ) + 1,
                                            row._links.delete.href.length
                                          )
                                        )
                                      }
                                      color="primary"
                                    >
                                      {t(
                                        "globals.list.actionIcons.delete.dialog.dialogDelete"
                                      )}
                                    </Button>
                                  </ActionFlexStyled>
                                </DialogActions>
                              </Dialog>
                            </span>
                          </span>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : !isLoading ? (
                    <StyledTableRow>
                      <StyledTableCell colSpan="5">
                        <Typography
                          variant="h6"
                          color="inherit"
                          align="center"
                          paragraph={false}
                        >
                          {t("globals.list.messages.noData")}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : (
                    false
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </TopDivStyled>
        </div>
      )}
      {snackbar && (
        <ShowSnackBar
          message={t("globals.list.actionIcons.delete.successMessage")}
        />
      )}
    </ManageSectionWrapper>
  );
};

export const ManageSubmission = withRouter(ManageSubmissionDef);
