import React, { MouseEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import acorn from "@recommend/static/image/acorn.svg";
import beef from "@recommend/static/image/beef.svg";
import carrot from "@recommend/static/image/carrot.svg";
import chickenBreast from "@recommend/static/image/chickenBreast.svg";
import chicken from "@recommend/static/image/chicken.svg";
import chives from "@recommend/static/image/chives.svg";
import eggs from "@recommend/static/image/eggs.svg";
import greenOnion from "@recommend/static/image/greenOnion.svg";
import hairtail from "@recommend/static/image/hairtail.svg";
import jelly from "@recommend/static/image/jelly.svg";
import mackerel from "@recommend/static/image/mackerel.svg";
import noodles from "@recommend/static/image/noodles.svg";
import nori from "@recommend/static/image/nori.svg";
import octopus from "@recommend/static/image/octopus.svg";
import paprika from "@recommend/static/image/paprika.svg";
import pork from "@recommend/static/image/pork.svg";
import potato from "@recommend/static/image/potato.svg";
import pumpkin from "@recommend/static/image/pumpkin.svg";
import ramen from "@recommend/static/image/ramen.svg";
import riceCake from "@recommend/static/image/riceCake.png";
import sesameLeaf from "@recommend/static/image/sesameLeaf.svg";
import vegetables from "@recommend/static/image/vegetables.svg";
import wheat from "@recommend/static/image/wheat.svg";
import { Paper, Avatar, Button } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Ingredient } from "@lib/interfaces";
import { findRecommendFood } from "@lib/helper";
import TodayRankModal from "@recommend/components/TodayRankModal";

const imageObject = {
  acorn,
  beef,
  carrot,
  chickenBreast,
  chicken,
  chives,
  eggs,
  greenOnion,
  hairtail,
  jelly,
  mackerel,
  noodles,
  nori,
  octopus,
  paprika,
  pork,
  potato,
  pumpkin,
  ramen,
  riceCake,
  sesameLeaf,
  vegetables,
  wheat,
};

const useStyles = makeStyles((theme: Theme) => ({
  rootContainer: {
    textAlign: "center",
    margin: "5% 3% 15% 3%",
    padding: "5%",
  },
  container: {
    padding: "5%",
  },
  ingredientChip: {
    margin: "2px 2px",
  },
  ingredientBox: {
    margin: "5% auto",
  },
  foodLegends: {
    textAlign: "left",
    padding: "5px 10px",
    borderRadius: "40px",
    backgroundColor: "#A1C45A",
  },
  foodFieldset: {
    border: `solid thin ${theme.palette.grey[400]}`,
    padding: "3% 3%",
  },
}));

const mainIngredientMappingList: Ingredient[] = [
  {
    name: "beef",
    korean: "?????????",
    alt: "????????? ?????????",
  },
  {
    name: "pork",
    korean: "????????????",
    alt: "???????????? ?????????",
  },
  {
    name: "chicken",
    korean: "?????????",
    alt: "????????? ?????????",
  },
  {
    name: "chickenBreast",
    korean: "????????????",
    alt: "???????????? ?????????",
  },
  {
    name: "riceCake",
    korean: "???",
    alt: "??? ?????????",
  },
  {
    name: "hairtail",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "pumpkin",
    korean: "?????????",
    alt: "????????? ?????????",
  },
  {
    name: "paprika",
    korean: "????????????",
    alt: "???????????? ?????????",
  },
  {
    name: "ramen",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "acorn",
    korean: "????????????",
    alt: "???????????? ?????????",
  },
  {
    name: "wheat",
    korean: "?????????",
    alt: "????????? ?????????",
  },
  {
    name: "octopus",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "mackerel",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "noodles",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "eggs",
    korean: "??????",
    alt: "?????? ?????????",
  },
];
const subIngredientMappingList: Ingredient[] = [
  {
    name: "greenOnion",
    korean: "???",
    alt: "??? ?????????",
  },
  {
    name: "potato",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "chives",
    korean: "???",
    alt: "???(??????) ?????????",
  },
  {
    name: "nori",
    korean: "???",
    alt: "???(??????) ?????????",
  },
  {
    name: "jelly",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "sesameLeaf",
    korean: "??????",
    alt: "?????? ?????????",
  },
  {
    name: "vegetables",
    korean: "????????????",
    alt: "???????????? ?????????",
  },
  {
    name: "carrot",
    korean: "??????",
    alt: "?????? ?????????",
  },
];

const RecommendPage: React.FC = () => {
  const [mainIngredients, setMainIngredients] = useState<Array<string | null>>(
    []
  );
  const [subIngredients, setSubIngredients] = useState<Array<string | null>>(
    []
  );
  const [check, setCheck] = useState<Boolean>(false);

  const toggleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    let checked = event.currentTarget.checked;
    setCheck(checked);
  };

  const toggleMainIngredient = (event: MouseEvent) => {
    event.preventDefault();
    let target = event.currentTarget;
    let item = target.childNodes?.[1];
    let v = item.textContent;
    if (mainIngredients.includes(v)) {
      mainIngredients.splice(mainIngredients.indexOf(v), 1);
      setMainIngredients([...mainIngredients]);
    } else {
      setMainIngredients([...mainIngredients, v]);
    }
  };
  const toggleSubIngredient = (event: MouseEvent) => {
    event.preventDefault();
    let target = event.currentTarget;
    let item = target.childNodes?.[1];
    let v = item.textContent;
    if (subIngredients.includes(v)) {
      subIngredients.splice(subIngredients.indexOf(v), 1);
      setSubIngredients([...subIngredients]);
    } else {
      setSubIngredients([...subIngredients, v]);
    }
  };

  const onSubmit = async () => {
    const data = {
      mainIngredients,
      subIngredients,
      check,
    };
    const config = {
      withCredentials: true,
    };
    findRecommendFood(data, config);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.rootContainer}>
      <h1>?????? ??? ?????????????????</h1>
      <TodayRankModal />
      <Paper className={classes.container} elevation={3}>
        <section className={classes.ingredientBox}>
          <fieldset className={classes.foodFieldset}>
            <legend className={classes.foodLegends}>?????? ????????????</legend>
            {mainIngredientMappingList.map((item) => {
              return (
                <Chip
                  avatar={
                    <Avatar alt={item.alt} src={imageObject[item.name]} />
                  }
                  label={item.korean}
                  className={classes.ingredientChip}
                  onClick={toggleMainIngredient}
                  key={uuidv4()}
                  style={{
                    backgroundColor: ` ${
                      mainIngredients.includes(item.korean)
                        ? "#A1C45A"
                        : "#e0e0e0"
                    }`,
                  }}
                />
              );
            })}
          </fieldset>
        </section>
        <section className={classes.ingredientBox}>
          <fieldset className={classes.foodFieldset}>
            <legend className={classes.foodLegends}>?????? ????????????</legend>
            {subIngredientMappingList.map((item) => {
              return (
                <Chip
                  avatar={
                    <Avatar alt={item.alt} src={imageObject[item.name]} />
                  }
                  label={item.korean}
                  className={classes.ingredientChip}
                  onClick={toggleSubIngredient}
                  clickable
                  key={uuidv4()}
                  style={{
                    backgroundColor: ` ${
                      subIngredients.includes(item.korean)
                        ? "#A1C45A"
                        : "#e0e0e0"
                    }`,
                  }}
                />
              );
            })}
          </fieldset>
        </section>
      </Paper>
      <h1>??? ??????!!</h1>

      <FormControlLabel
        control={<Checkbox name="seasoning" onChange={toggleCheck} />}
        labelPlacement="start"
        label="?????? ???????????? ??????!"
      />
      <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
        ?????? ????????????
      </Button>
    </Paper>
  );
};

export default RecommendPage;
