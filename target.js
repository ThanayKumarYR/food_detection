function labelhover() {
    let styles = document.querySelector("label").style;
    styles.backgroundColor = "rgb(209, 209, 209)";
    styles.color = "#000000";
    styles.border = "1px solid #000000";
  }
  function label() {
    let styles = document.querySelector("label").style;
    styles.backgroundColor = "#000000";
    styles.color = "#ffffff";
    styles.border = "1px solid rgb(209, 209, 209)";
  }
  let model;
  let modelLoaded = false;
  async function loadmodel() {
    model = await tf.loadLayersModel("bestmodel/model.json");
    console.log("loaded");
    modelLoaded = true;
  }
  loadmodel();
  let image = document.getElementById("image");
  let imageLoaded = false;
  function imageHandler(e) {
    // console.log("called");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        image.src = reader.result;
        imageLoaded = true;
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  async function predict() {
    let food = document.getElementById("food");
      food.innerHTML = "Food           : ???";
    if (!modelLoaded) {
      alert("The model must be loaded first");
      return;
    }
    if (!imageLoaded) {
      alert("Please select an image first");
      return;
    }
    let tensor = tf.browser.fromPixels(image, 3)
		.resizeNearestNeighbor([256, 256])
		.expandDims()
		.toFloat()
		.reverse(-1);
    prediction = await model.predict(tensor).data();
    // console.log(prediction);
    if (prediction[0] === 1) {
      let food = document.getElementById("food");
      food.innerHTML = "Food           : YES";
    } else {
      let food = document.getElementById("food");
      food.innerHTML = "Food           : NO ";
    }
    imageLoaded = false;
  }