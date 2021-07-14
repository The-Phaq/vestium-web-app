import withSession from 'hoc/session';

export default withSession(async (req, res) => {
  req.session.destroy();
  res.json();
});
