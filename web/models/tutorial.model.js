const execSQL = require("./db.model");

class Tutorial {
  constructor(obj, obj2) {
    this.obj = obj;
    this.obj2 = obj2;
  }

  // 添加记录
  async create() {
    const sql =
      "insert into tutorials (title,description,published) values (?,?,?)";
    // Object.value() 方法将对象的值转为数组
    const key = Object.keys(this.obj);
    const values = Object.values(this.obj);
    key.indexOf("published") !== -1 ? "" : values.push("0");
    try {
      return await execSQL(sql, values);
    } catch (err) {
      return err;
    }
  }

  // 查询所有记录
  async findAll() {
    const sql = "select * from tutorials";
    try {
      return await execSQL(sql);
    } catch (err) {
      return err;
    }
  }
}

module.exports = Tutorial;
