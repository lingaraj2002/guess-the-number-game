// Text Utility
export const Text = (scene, x, y, text, size) => {
  // Create & Return The  Text
  return scene.add
    .text(x, y, text, {
      fontFamily: "VT323",
      fontSize: size,
      fontStyle: "bold",
      color: "#0f380f",
      align: "center",
      resolution: 4,
    })
    .setOrigin(0.5);
};

// Button Utility
export const Button = (scene, x, y, imageKey, label, fontSize, callback) => {
  // Create Image And Text For Button
  const image = scene.add.image(0, 0, imageKey).setOrigin(0.5);
  const text = scene.add
    .text(0, 0, label, {
      fontFamily: "VT323",
      fontSize: fontSize,
      fontStyle: "bold",
      color: "#0f380f",
      resolution: 4,
    })
    .setOrigin(0.5);

  // Put The Image And Text Into Container
  const button = scene.add.container(x, y, [image, text]);

  // Set Button Interactive
  button.setSize(image.width, image.height);
  button.setInteractive({ cursor: "pointer" });
  button.on("pointerover", () => {
    button.setScale(1.05);
  });
  button.on("pointerout", () => {
    button.setScale(1);
  });
  button.on("pointerdown", callback);

  // Return The Background Image And Label
  return { image, text };
};
