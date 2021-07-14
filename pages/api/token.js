import withSession from 'hoc/session';

export default withSession(async (req, res) => {
  const { token } = await req.body;
  req.session.set("token", token);
  await req.session.save();
  res.json();
});
