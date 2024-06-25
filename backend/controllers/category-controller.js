import categoryModel from "../models/categorymodel.js";
const getallcateg = async (req, res) => {
  try {
    const fetchallcateg = await categoryModel.find({});
    return res.status(200).json({ message: fetchallcateg });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const addnewcateg = async (req, res) => {
  const { title } = req.body;

  try {
    if (title) {
      const newcateg = await categoryModel({
        title,
      });

      const savedcateg = await newcateg.save();
      if (savedcateg) {
        res.status(200).json({ message: "Category created successfully" });
      } else {
        res.status(400).json({ message: "Failed to create category" });
      }
    } else {
      res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { getallcateg, addnewcateg };
