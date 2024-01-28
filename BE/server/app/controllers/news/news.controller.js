const MongoDB = require("../../utils/mongodb.util");
const NewsService = require("../../services/news.service");
const { ObjectId } = require("mongodb");
const ApiError = require("../../api-errors");
const fs = require("fs");
const path = require("path");

exports.createNews = async (req, res, next) => {
  try {
    if (!req.body) {
      res.send("Khong co noi dung");
    } else {
      const newService = new NewsService(MongoDB.client);
      const img = await (process.env.SERVER_LINK_NEWS_IMG + req.file.filename);
      let rs = await newService.createNews(req.body, img);
      res.send(rs);
    }
  } catch (error) {}
};
exports.getNews = async (req, res, next) => {
  try {
    const newService = new NewsService(MongoDB.client);
    var filter = {};
    const { id } = req.query;
    if (id) {
      filter._id = new ObjectId(id);
    }
    let rs = await newService.getNews(filter);
    res.send(rs);
  } catch (error) {}
};
exports.deleteNews = async (req, res, next) => {
  try {
    if (req.params.id) {
      const newService = new NewsService(MongoDB.client);
      const newsImg = await newService.getNews({
        _id: new ObjectId(req.params.id),
      });
      const url = newsImg[0].img;
      const parts = url.split("/");
      const fileName = parts[parts.length - 1];
      fs.unlinkSync(path.join(__dirname, `../../store/img/news/${fileName}`));

      let rs = await newService.deleteNews(req.params.id);
      res.send(rs);
    } else {
      return next(new ApiError(400, "id can not be empty"));
    }
  } catch (error) {
    console.log(error);
  }
};
