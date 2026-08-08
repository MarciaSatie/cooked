import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Rating from "@mui/material/Rating";
import { visuallyHidden } from "@mui/utils";
import type { Review } from "../../types/interfaces";

type ReviewProps = {
  reviewList: Review[];
};

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Review | "contentPreview";
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "author", numeric: false, disablePadding: true, label: "Author" },
  { id: "contentPreview", numeric: false, disablePadding: false, label: "Review Text" },
  { id: "rating", numeric: true, disablePadding: false, label: "Rating" },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends PropertyKey>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean },
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TableHeader(props: {
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Review | "contentPreview") => void;
}) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: keyof Review | "contentPreview") => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead >
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ReviewTable({ reviewList }: ReviewProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Review | "contentPreview">("author");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Review | "contentPreview",
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      [...reviewList]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, reviewList],
  );

  return (
    <Box sx={{ width: "100%" }}>
        <TableContainer sx={{ width: "90%", ml: 5, mr:5 }}>
          <Table sx={{ minWidth: 350 }} aria-labelledby="reviewTableTitle" size="medium">
            <TableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover tabIndex={-1} key={`${row.recipeId}-${row.author}`}>
                  <TableCell component="th" scope="row" padding="none">
                    {row.author}
                  </TableCell>
                  <TableCell>{row.content}</TableCell>
                  <TableCell align="right">
                    <Rating value={row.rating} precision={0.5} readOnly />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reviewList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

    </Box>
  );
}