import { colors } from "../../constants/color";
import { Stack } from "@mui/system";
import React from "react";
import { category } from "../../constants";
import "../../index.css";

const Category = ({ selectedCategoryHandler, selectedCategory }) => {
  return (
    <Stack direction={"row"} sx={{ overflowX: "scroll" }} flexWrap={'wrap'}>
      {category.map((item) => (
        <button
          key={item.name}
          className="category-btn"
          style={{ borderRadius: 0,
          backgroundColor: item.name == selectedCategory && colors.secondary,
          color: item.name == selectedCategory && '#fff',
          }}
          onClick={() => selectedCategoryHandler(item.name)}
        >
          <span style={{ color: item.name == selectedCategory ? '#fff' : colors.secondary, marginRight: "15px" }}>
            {item.icon}
          </span>
          <span>
            {item.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Category;
