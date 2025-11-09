export default class AudioManager {
  static bgm = null;

  static playBgm(scene) {
    if (!AudioManager.bgm) {
      AudioManager.bgm = scene.sound.add("bgm", {
        loop: true,
        volume: 0.4,
      });
      AudioManager.bgm.play();
    }
  }
}
