import { useEffect, useState } from "react";
import { ViewerApp, addBasePlugins, AssetManagerPlugin, AssetImporter, VariationConfiguratorPlugin } from "webgi";

export default function WebgiApp(props: any) {
  const [viewer, setViewer] = useState<ViewerApp>();
  useEffect(() => {
    setupViewer();
    return () => {
      disposeViewer();
    };
  }, []);

  async function setupViewer() {
    // Initialize the viewer
    let viewer = new ViewerApp({
      canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
      useRgbm: true,
      useGBufferDepth: true,
      isAntialiased: false,
    });

    console.log(props);
    viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

    await addBasePlugins(viewer);

    const manager = await viewer.getPlugin(AssetManagerPlugin)!;
    await viewer.renderer.refreshPipeline();

    const config = await viewer.addPlugin(VariationConfiguratorPlugin);
    await config.importPath("https://3dassetsmaan.s3.ap-south-1.amazonaws.com/VariationConfiguratorTutorials/1/config.json");
    manager.addFromPath("https://3dassetsmaan.s3.ap-south-1.amazonaws.com/VariationConfiguratorTutorials/1/scene.vjson");

    setViewer(viewer);
    props.setConfig(config);
  }

  function disposeViewer() {
    if (!viewer) return;
    viewer.scene.disposeSceneModels();
    viewer.scene.dispose();
    viewer.renderer.dispose();
    viewer.dispose();
  }

  return (
    <div id="webgi-canvas-container" className="w-full h-full">
      <canvas id="webgi-canvas" className="w-full h-full"></canvas>
    </div>
  );
}
