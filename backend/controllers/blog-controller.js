import blogmodel from "../models/blogmodel.js";

const getallblog = async (req, res) => {
  try {
    const fetchallblogs = await blogmodel.find({ user: req.user._id }); // andar ke params ko agar hataya toh sab user ka milega
    res.status(200).json({ message: fetchallblogs });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const addnewblog = async (req, res) => {
  const { title, category, description } = req.body;

  try {
    if (title && category && description) {
      const addblog = new blogmodel({
        title: title,
        category: category,
        description: description,
        thumbnail: req.file.filename,
        user: req.user._id,
      });

      const savedblog = await addblog.save();
      if (savedblog) {
        return res.status(200).json({ message: "Blog has been created" });
      } else {
        return res.status(400).json({ message: "Data is not saved" });
      }
    } else {
      return res.status(400).json({ message: req.body });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getsingleblog = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const fetchallblogbyid = await blogmodel.findByID(id);
      res.status(200).json({ message: fetchallblogbyid });
    } else {
      res.status(400).json({ message: "Invalid URL" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export { getallblog, addnewblog, getsingleblog };
