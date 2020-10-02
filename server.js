const app = require("./config/app");

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
