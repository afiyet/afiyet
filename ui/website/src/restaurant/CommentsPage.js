import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommentItem from './components/CommentItem';
import { getComments } from '../endpoints';
import { useSelector } from 'react-redux';

export default function Comments() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [comments, setComments] = useState([]);
  const restaurnatState = useSelector(state => state.restaurantState);

  useEffect(() => {
    getComments(restaurnatState.restaurantId)
    .then((res) => {
      console.log(res.data);
      setComments(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  const buttons = [
    <Button variant={(selectedFilter === "5") ? "contained" : "outlined"} key="five" onClick={() => {handleFilterButtonClick("5")}}>5</Button>,
    <Button variant={(selectedFilter === "4") ? "contained" : "outlined"} key="four" onClick={() => {handleFilterButtonClick("4")}}>4</Button>,
    <Button variant={(selectedFilter === "3") ? "contained" : "outlined"} key="three" onClick={() => {handleFilterButtonClick("3")}}>3</Button>,
    <Button variant={(selectedFilter === "2") ? "contained" : "outlined"} key="two" onClick={() => {handleFilterButtonClick("2")}}>2</Button>,
    <Button variant={(selectedFilter === "1") ? "contained" : "outlined"} key="one" onClick={() => {handleFilterButtonClick("1")}}>1</Button>,
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
          <Typography style={styles.pageTitle} gutterBottom variant="h3">Yorumlar</Typography>
          <Box style={styles.buttonsContainer}>
            <ButtonGroup size="large" aria-label="large button group">
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
    alignItems: "center"
  }
};
