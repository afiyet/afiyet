import { Box, Typography, Button, ButtonGroup, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommentItem from './components/CommentItem';
import { getAveragePoint, getComments } from '../endpoints';
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import useInterval from '../customHooks/UseInterval';
import { useLocation } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

export default function Comments() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [comments, setComments] = useState([]);
  const [avgPoint, setAvgPoint] = useState(0);
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

      getAveragePoint(restaurnatState.restaurantId)
      .then((res) => {
        setAvgPoint(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const buttons = [
    <Button variant={(selectedFilter === "5") ? "contained" : "outlined"} key="five" onClick={() => { handleFilterButtonClick("5") }}><Rating value={5} readOnly /></Button>,
    <Button variant={(selectedFilter === "4") ? "contained" : "outlined"} key="four" onClick={() => { handleFilterButtonClick("4") }}><Rating value={4} readOnly /></Button>,
    <Button variant={(selectedFilter === "3") ? "contained" : "outlined"} key="three" onClick={() => { handleFilterButtonClick("3") }}><Rating value={3} readOnly /></Button>,
    <Button variant={(selectedFilter === "2") ? "contained" : "outlined"} key="two" onClick={() => { handleFilterButtonClick("2") }}><Rating value={2} readOnly /></Button>,
    <Button variant={(selectedFilter === "1") ? "contained" : "outlined"} key="one" onClick={() => { handleFilterButtonClick("1") }}><Rating value={1} readOnly /></Button>,
  ];

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon fontSize="large" color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon fontSize="large" color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon fontSize="large" color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon fontSize="large" color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon fontSize="large" color="success" />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

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
            <StyledRating
              name="highlight-selected-only"
              defaultValue={0}
              value={avgPoint}
              IconContainerComponent={IconContainer}
              readOnly
              size='large'
              highlightSelectedOnly
            />
          </Box>
          <Grid container style={{ width: "auto" }}>
            {
              buttons.map((button) => {
                return (
                  <Box style={styles.buttonsContainer}>
                    <Grid item>
                      {button}
                    </Grid>
                  </Box>
                );
              })
            }
          </Grid>
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
    borderRadius: 4,
    display: "flex"
  },
  titleAndFilter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  }
};
