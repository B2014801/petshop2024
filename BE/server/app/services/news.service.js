const { ObjectId } = require("mongodb");

class NewsService {
  constructor(client) {
    this.news = client.db().collection("news");
  }
  async createNews(data, img) {
    try {
      delete data.news;
      //createDate
      const { format } = require("date-fns");
      const currentDate = new Date();
      const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");

      let rs = await this.news.findOneAndUpdate(
        { ...data, img, createDate: formattedDate, view: 0 },
        { $set: {} },
        { returnDocument: "after", upsert: true }
      );
      return rs;
    } catch (e) {}
  }
  async getNews(filter) {
    try {
      let document = await this.news.find(filter).toArray();
      if (filter && filter._id) {
        await this.news.findOneAndUpdate(
          { _id: filter._id },
          { $inc: { view: 1 } },
          {
            returnDocument: "after",
          }
        );
      }
      return document;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteNews(id) {
    let rs = await this.news.findOneAndDelete({ _id: new ObjectId(id) });
    return rs;
  }
}
module.exports = NewsService;
