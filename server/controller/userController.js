export const check = (req, res) => {
  res.send("hello utsav");
};
export const registerUser = (req, res) => {
  const dta = {
    user_id: req.body.userId,
    user_name: req.body.username,
    user_email: req.body.email,
    user_contact: req.body.contact,
    user_address: req.body.address,
    user_city: req.body.referral,
    user_street: req.body.gfid,
    user_district: req.body.gfid,
    user_gender: req.body.gfid,
    user_password: req.body.gfid,

    user_toc: req.body.toc,
    user_prof: req.body.image,
  };
};
