import style from "./selected-ingredient.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ingredientDelete } from "../../services/actions/ingredients";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";

const SelectedIngredient = ({
  index,
  ingredientId,
  ingredient,
  moveIngredientFunc,
}) => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (store) => store.ingredientReducer.selectedIngredients
  );
  const ref = useRef(null);
  const [{ isDrag }, drag] = useDrag({
    type: "selected-ingredient",
    item: () => {
      return { ingredientId, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const opacity = isDrag ? 0 : 1;

  const [, drop] = useDrop({
    accept: "selected-ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(ingredient, monitor) {
      if (!ref.current) return;
      const dragInd = ingredient.index;
      const hoverInd = index;
      if (dragInd === hoverInd) return;
      const clientOffset = monitor.getClientOffset();
      const hoverRect = ref.current?.getBoundingClientRect();
      const hoverY = (hoverRect.bottom - hoverRect.top) / 2;
      const hoverClientY = clientOffset.y - hoverRect.top;

      if (dragInd > hoverInd && hoverClientY > hoverY) {
        return;
      }
      if (dragInd < hoverInd && hoverClientY < hoverY) {
        return;
      }

      moveIngredientFunc(dragInd, hoverInd);
      ingredient.index = hoverInd;
    },
  });

  const onIngredientDelete = (ingrediet) => () => {
    const newSelectedIngredients = selectedIngredients.slice();
    const selectedIngredientId = selectedIngredients.indexOf(ingrediet);
    newSelectedIngredients.splice(selectedIngredientId, 1);
    dispatch(ingredientDelete(newSelectedIngredients));
  };
  drag(drop(ref));

  return (
    <li style={{ opacity }} className={style.list_item} ref={ref}>
      <DragIcon />
      <ConstructorElement
        key={ingredientId}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={onIngredientDelete(ingredient)}
      />
    </li>
  );
};

SelectedIngredient.propTypes = {
  ingredientId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape(IngredientType).isRequired,
  moveIngredientFunc: PropTypes.func.isRequired,
};

export default SelectedIngredient;
