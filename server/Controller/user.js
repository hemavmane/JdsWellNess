const userModal = require("../Modal/user");

class UserManagement {
  async Adduser(req, res) {
    try {
      const { password, email, username,phone } = req.body;

      const authdata = new userModal({ password, email, username,phone });
      let savedAuth = await authdata.save();
      if (savedAuth) {
        return res.status(200).json({message:"Your account created succesfully",
          data:savedAuth});
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async Login(req, res) {
    try {
      const { password, email } = req.body;
      let finduser = await userModal.findOne({});
      console.log(finduser, "finduser")
      if (finduser.email !== email || finduser.password !== password) {
        return res.status(400).json({ error: "user does exist" });
      }
      if (finduser.email == email && finduser.password == password) {
        return res.status(200).json({data:finduser,message:"Logged In successfully"});
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await userModal.find({});
      res.status(200).json(Auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async AuthTrash(req, res) {
    try {
      const { id } = req.params;
      await userModal.findByIdAndDelete(id);
      res.status(200).json({ message: "Auth deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

}
const userController = new UserManagement();
module.exports = userController;
