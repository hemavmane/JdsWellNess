const AuthModal = require("../Modal/Auth");

class Auth {
  async AddAuth(req, res) {
    try {
      const { password, email, username } = req.body;

      const authdata = new AuthModal({ password, email, username });
      let savedAuth = await authdata.save();
      if (savedAuth) {
        return res.status(200).json(savedAuth);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async Login(req, res) {
    try {
      const { password, email } = req.body;
      let finduser = await AuthModal.findOne({});
     console.log(finduser,"finduser")
      if (finduser.email !== email || finduser.password !== password) {
        return res.status(400).json({ error: "user does exist" });
      }
      if (finduser.email == email && finduser.password == password) {
        return res.status(200).json(finduser);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async GetData(req, res) {
    try {
      const Auth = await AuthModal.find({});
      res.status(200).json(Auth);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async AuthTrash(req, res) {
    try {
      const { id } = req.params;
      await AuthModal.findByIdAndDelete(id);
      res.status(200).json({ message: "Auth deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
  // async AuthUpdate(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const { password, email, username } = req.body;
  //     const updatedAuth = await AuthModal.findByIdAndUpdate(
  //       id,
  //       { password, email, username },
  //       { new: true }
  //     );
  //     res.status(200).json({
  //       message: "Auth updated successfully",
  //       Auth: updatedAuth,
  //     });
  //   } catch (err) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }
}
const AuthController = new Auth();
module.exports = AuthController;
