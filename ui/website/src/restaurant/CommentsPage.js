import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommentItem from './components/CommentItem';
import { getComments } from '../endpoints';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import useInterval from '../customHooks/UseInterval';
import { useLocation } from 'react-router-dom';

export default function Comments() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [comments, setComments] = useState([]);
  const restaurnatState = useSelector(state => state.restaurantState);
  const { t, i18n } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  useEffect(() => {
    fetchComments();
  }, []);

  useInterval(fetchComments, (location.pathname === "/comments") ? 30000 : null);

  function fetchComments() {
    getComments(restaurnatState.restaurantId)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(t("REVIEWS_PAGE.FETCH_ERROR"), { variant: "error" });
      })
  };

  const buttons = [
    <Button variant={(selectedFilter === "5") ? "contained" : "outlined"} key="five" onClick={() => { handleFilterButtonClick("5") }}><Rating value={5} readOnly /></Button>,
    <Button variant={(selectedFilter === "4") ? "contained" : "outlined"} key="four" onClick={() => { handleFilterButtonClick("4") }}><Rating value={4} readOnly /></Button>,
    <Button variant={(selectedFilter === "3") ? "contained" : "outlined"} key="three" onClick={() => { handleFilterButtonClick("3") }}><Rating value={3} readOnly /></Button>,
    <Button variant={(selectedFilter === "2") ? "contained" : "outlined"} key="two" onClick={() => { handleFilterButtonClick("2") }}><Rating value={2} readOnly /></Button>,
    <Button variant={(selectedFilter === "1") ? "contained" : "outlined"} key="one" onClick={() => { handleFilterButtonClick("1") }}><Rating value={1} readOnly /></Button>,
  ];

  function handleFilterButtonClick(clickedButtonValue) {
    if (selectedFilter === clickedButtonValue) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(clickedButtonValue);
    }
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.commentsContainer}>
        <Box style={styles.titleAndFilter}>
          <Typography style={styles.pageTitle} variant="h3">{t("REVIEWS_PAGE.TITLE")}</Typography>
          <Box style={styles.buttonsContainer}>
            <ButtonGroup size="medium" aria-label="large button group">
              {buttons}
            </ButtonGroup>
          </Box>
        </Box>
        {
          comments.filter((comment) => {
            if ("" === selectedFilter) {
              return true;
            } else {
              return comment.point.toString() === selectedFilter;
            }
          })
            .map((comment) => {
              return (
                <CommentItem
                  key={comment.ID}
                  userFullName={comment.user.name + " " + comment.user.surname}
                  comment={comment.comment}
                  point={comment.point}
                  date={comment.createdAt}
                />
              );
            })
        }
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",

  },
  commentsContainer: {
    width: '70vw',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#d82227',
    marginTop: '2vh',
    borderRadius: '1vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: 20,
  },
  pageTitle: { fontFamily: "monospace", color: "#fff" },
  buttonsContainer: {
    backgroundColor: "#fff",
    borderRadius: 4
  },
  titleAndFilter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  }
};
