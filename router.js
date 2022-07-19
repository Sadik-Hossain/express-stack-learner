const router = require("express").Router();
const {
  aboutController,
  helpController,
  homeController,
  localController,
  pageController,
} = require("./controller");

router.get("/", homeController);
router.get("/pages", pageController);
router.get("/about", aboutController);
router.get("/help", helpController);
router.get("/local", localController);
module.exports = router;
